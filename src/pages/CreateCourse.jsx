import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Chip,
    IconButton,
    Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { courseService } from "../services/courseService";

const CreateCourse = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        level: "beginner",
        price: 0,
        duration: 0,
        requirements: [],
        objectives: [],
    });
    const [newRequirement, setNewRequirement] = useState("");
    const [newObjective, setNewObjective] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            await courseService.createCourse({
                ...courseData,
                notificationType: "course", // Usar el tipo existente
            });
            navigate("/courses");
        } catch (err) {
            setError(err.response?.data?.message || "Error al crear el curso");
            console.error("Error details:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addRequirement = () => {
        if (newRequirement.trim()) {
            setCourseData((prev) => ({
                ...prev,
                requirements: [...prev.requirements, newRequirement.trim()],
            }));
            setNewRequirement("");
        }
    };

    const addObjective = () => {
        if (newObjective.trim()) {
            setCourseData((prev) => ({
                ...prev,
                objectives: [...prev.objectives, newObjective.trim()],
            }));
            setNewObjective("");
        }
    };

    const removeRequirement = (index) => {
        setCourseData((prev) => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index),
        }));
    };

    const removeObjective = (index) => {
        setCourseData((prev) => ({
            ...prev,
            objectives: prev.objectives.filter((_, i) => i !== index),
        }));
    };

    return (
        <Container
            maxWidth="md"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Crear Nuevo Curso
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="title"
                                label="Título del Curso"
                                value={courseData.title}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                rows={4}
                                name="description"
                                label="Descripción"
                                value={courseData.description}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Nivel</InputLabel>
                                <Select
                                    name="level"
                                    value={courseData.level}
                                    onChange={handleChange}
                                    label="Nivel"
                                >
                                    <MenuItem value="beginner">
                                        Principiante
                                    </MenuItem>
                                    <MenuItem value="intermediate">
                                        Intermedio
                                    </MenuItem>
                                    <MenuItem value="advanced">
                                        Avanzado
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    name="category"
                                    value={courseData.category}
                                    onChange={handleChange}
                                    label="Categoría"
                                >
                                    <MenuItem value="secondary">
                                        Secundaria
                                    </MenuItem>
                                    <MenuItem value="preparatory">
                                        Preparatoria
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                name="duration"
                                label="Duración (minutos)"
                                value={courseData.duration}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Requisitos
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={newRequirement}
                                        onChange={(e) =>
                                            setNewRequirement(e.target.value)
                                        }
                                        placeholder="Agregar requisito"
                                    />
                                    <IconButton
                                        onClick={addRequirement}
                                        color="primary"
                                    >
                                        <Plus />
                                    </IconButton>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {courseData.requirements.map(
                                        (req, index) => (
                                            <Chip
                                                key={index}
                                                label={req}
                                                onDelete={() =>
                                                    removeRequirement(index)
                                                }
                                                deleteIcon={<X size={16} />}
                                            />
                                        )
                                    )}
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Objetivos
                                </Typography>
                                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={newObjective}
                                        onChange={(e) =>
                                            setNewObjective(e.target.value)
                                        }
                                        placeholder="Agregar objetivo"
                                    />
                                    <IconButton
                                        onClick={addObjective}
                                        color="primary"
                                    >
                                        <Plus />
                                    </IconButton>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {courseData.objectives.map((obj, index) => (
                                        <Chip
                                            key={index}
                                            label={obj}
                                            onDelete={() =>
                                                removeObjective(index)
                                            }
                                            deleteIcon={<X size={16} />}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/courses")}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={loading}
                                >
                                    Crear Curso
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default CreateCourse;
