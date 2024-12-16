/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from "@mui/material";
import api from "../services/api";

const EditLessonDialog = ({ open, lesson, onClose, onUpdate, courseId }) => {
    const [form, setForm] = useState(lesson || {});

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        try {
            await api.put(`/api/courses/${courseId}/lessons/${lesson.id}`, form);
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error updating lesson:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Editar Lección</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Título"
                        value={form.title || ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Contenido"
                        value={form.content || ""}
                        onChange={(e) =>
                            handleChange("content", e.target.value)
                        }
                    />
                    <TextField
                        type="number"
                        label="Duración (minutos)"
                        value={form.duration || ""}
                        onChange={(e) =>
                            handleChange("duration", e.target.value)
                        }
                    />
                    <TextField
                        fullWidth
                        label="URL del Video"
                        value={form.videoUrl || ""}
                        onChange={(e) =>
                            handleChange("videoUrl", e.target.value)
                        }
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditLessonDialog;
