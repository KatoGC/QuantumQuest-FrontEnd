/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Stack,
    Alert,
    IconButton,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { Plus, Trash2, GripVertical, Edit } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import api from "../services/api";
import EditLessonDialog from "./EditLessonDialog";

const DeleteLessonDialog = ({ open, onClose, onConfirm, lessonTitle }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
            ¿Estás seguro de que deseas eliminar la lección "{lessonTitle}"?
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={onConfirm} color="error" variant="contained">
                Eliminar
            </Button>
        </DialogActions>
    </Dialog>
);

const CreateLesson = ({ courseId, onLessonCreated, existingLessons = [] }) => {
    const [lessons, setLessons] = useState([
        {
            title: "",
            content: "",
            duration: "",
            videoUrl: "",
            orderIndex: existingLessons.length,
        },
    ]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [editingLesson, setEditingLesson] = useState(null);
    const [deletingLesson, setDeletingLesson] = useState(null);

    const handleReorder = async (result) => {
        if (!result.destination) return;

        const items = Array.from(existingLessons);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedItems = items.map((item, index) => ({
            ...item,
            orderIndex: index,
        }));

        try {
            await Promise.all(
                updatedItems.map((lesson) =>
                    api.put(`/api/courses/${courseId}/lessons/${lesson.id}`, {
                        orderIndex: lesson.orderIndex,
                    })
                )
            );
            onLessonCreated();
        } catch (error) {
            setError("Error al reordenar lecciones");
        }
    };

    const handleAdd = () => {
        setLessons([
            ...lessons,
            {
                title: "",
                content: "",
                duration: "",
                videoUrl: "",
                orderIndex: lessons.length,
            },
        ]);
    };

    const handleRemove = (index) => {
        setLessons(lessons.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        const newLessons = [...lessons];
        newLessons[index][field] = value;
        setLessons(newLessons);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(
                `/api/courses/${courseId}/lessons/${deletingLesson.id}`
            );
            onLessonCreated();
            setDeletingLesson(null);
        } catch (error) {
            setError("Error al eliminar la lección");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Promise.all(
                lessons.map((lesson) =>
                    api.post(`/api/courses/${courseId}/lessons`, lesson)
                )
            );
            setSuccess("Lecciones creadas exitosamente");
            setLessons([
                {
                    title: "",
                    content: "",
                    duration: "",
                    videoUrl: "",
                    orderIndex: existingLessons.length + lessons.length,
                },
            ]);
            onLessonCreated();
        } catch (err) {
            setError(
                err.response?.data?.message || "Error al crear las lecciones"
            );
        }
    };

    return (
        <Box>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <Box mb={4}>
                <Typography variant="h6" gutterBottom>
                    Lecciones Existentes
                </Typography>
                <DragDropContext onDragEnd={handleReorder}>
                    <Droppable droppableId="lessons">
                        {(provided) => (
                            <List
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {existingLessons.map((lesson, index) => {
                                    <Draggable
                                        key={`lesson-${lesson.id}`}
                                        draggableId={`lesson-${lesson.id}`}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <ListItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                sx={{
                                                    border: "1px solid #e0e0e0",
                                                    mb: 1,
                                                    borderRadius: 1,
                                                    "&:hover": {
                                                        bgcolor: "action.hover",
                                                    },
                                                }}
                                            >
                                                <div
                                                    {...provided.dragHandleProps}
                                                >
                                                    <GripVertical
                                                        size={20}
                                                        style={{
                                                            marginRight: 8,
                                                            cursor: "grab",
                                                        }}
                                                    />
                                                </div>
                                                <ListItemText
                                                    primary={`${index + 1}. ${
                                                        lesson.title
                                                    }`}
                                                    secondary={`Duración: ${lesson.duration} minutos`}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        onClick={() =>
                                                            setEditingLesson(
                                                                lesson
                                                            )
                                                        }
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() =>
                                                            setDeletingLesson(
                                                                lesson
                                                            )
                                                        }
                                                    >
                                                        <Trash2 />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    </Draggable>;
                                })}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>

            <Typography variant="h6" gutterBottom>
                Agregar Nuevas Lecciones
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {lessons.map((lesson, index) => (
                        <Card key={index}>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={1}
                                    >
                                        <Typography>
                                            Lección{" "}
                                            {existingLessons.length + index + 1}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => handleRemove(index)}
                                        >
                                            <Trash2 />
                                        </IconButton>
                                    </Box>

                                    <TextField
                                        fullWidth
                                        label="Título"
                                        value={lesson.title}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="Contenido"
                                        value={lesson.content}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "content",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                    <Box display="flex" gap={2}>
                                        <TextField
                                            type="number"
                                            label="Duración (minutos)"
                                            value={lesson.duration}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "duration",
                                                    e.target.value
                                                )
                                            }
                                            InputProps={{
                                                inputProps: { min: 0 },
                                            }}
                                            fullWidth
                                        />

                                        <TextField
                                            fullWidth
                                            label="URL del Video"
                                            value={lesson.videoUrl}
                                            onChange={(e) =>
                                                handleChange(
                                                    index,
                                                    "videoUrl",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                <Box display="flex" gap={2} mt={3}>
                    <Button startIcon={<Plus />} onClick={handleAdd}>
                        Añadir Lección
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Guardar Lecciones
                    </Button>
                </Box>
            </form>

            <EditLessonDialog
                open={!!editingLesson}
                lesson={editingLesson}
                onClose={() => setEditingLesson(null)}
                onUpdate={onLessonCreated}
                courseId={courseId}
            />

            <DeleteLessonDialog
                open={!!deletingLesson}
                onClose={() => setDeletingLesson(null)}
                onConfirm={handleDeleteConfirm}
                lessonTitle={deletingLesson?.title}
            />
        </Box>
    );
};

export default CreateLesson;
