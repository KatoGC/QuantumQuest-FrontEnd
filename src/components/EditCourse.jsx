/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Grid,
    Typography,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Stack,
    Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        title: "",
        description: "",
        level: "beginner",
        price: 0,
        isPublished: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadCourse();
    }, [id]);

    const loadCourse = async () => {
        try {
            const response = await api.get(`/courses/${id}`);
            setCourse(response.data.data);
        } catch (err) {
            setError("Error al cargar el curso");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setCourse((prev) => ({
            ...prev,
            [name]: name === "isPublished" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/courses/${id}`, course);
            setSuccess("Curso actualizado exitosamente");
            setTimeout(() => navigate(`/courses/${id}`), 2000);
        } catch (err) {
            setError(
                err.response?.data?.message || "Error al actualizar el curso"
            );
        }
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" p={4}>
                Cargando...
            </Box>
        );

    return (
        <Box maxWidth="lg" mx="auto" p={4}>
            <Typography variant="h4" gutterBottom>
                Editar Curso
            </Typography>

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

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        fullWidth
                        label="Título"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Descripción"
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        required
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Nivel</InputLabel>
                                <Select
                                    name="level"
                                    value={course.level}
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

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Precio"
                                name="price"
                                value={course.price}
                                onChange={handleChange}
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Box display="flex" gap={2} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={() => navigate(`/courses/${id}`)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Guardar Cambios
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
};

export default EditCourse;
