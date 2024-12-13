import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Skeleton,
    Alert,
    Chip,
    Breadcrumbs,
    Link,
    Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { Book, Users, ArrowLeft, Calendar, Clock } from "lucide-react";
import { categoryService } from "../services/categoryService";

const CategoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategory = async () => {
            try {
                setLoading(true);
                const response = await categoryService.getCategoryById(id);
                setCategory(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        "Error al cargar la categoría"
                );
            } finally {
                setLoading(false);
            }
        };

        loadCategory();
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Skeleton variant="text" width="30%" height={40} />
                <Skeleton variant="rectangular" height={200} sx={{ mt: 2 }} />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!category) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="info">Categoría no encontrada</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Button
                        startIcon={<ArrowLeft />}
                        onClick={() => navigate(-1)}
                        sx={{ mb: 2 }}
                    >
                        Volver
                    </Button>

                    <Breadcrumbs sx={{ mb: 2 }}>
                        <Link
                            href="/categories"
                            underline="hover"
                            color="inherit"
                        >
                            Categorías
                        </Link>
                        <Typography color="text.primary">
                            {category.level}
                        </Typography>
                        <Typography color="text.primary">
                            Grado {category.grade}
                        </Typography>
                    </Breadcrumbs>

                    <Typography variant="h4" gutterBottom>
                        {category.name}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                        <Chip
                            icon={<Calendar size={16} />}
                            label={`${category.level} - ${category.grade}° Grado`}
                            color="primary"
                        />
                        <Chip
                            icon={<Book size={16} />}
                            label={`${category.courses?.length || 0} cursos`}
                        />
                    </Box>

                    <Typography variant="body1" paragraph>
                        {category.description}
                    </Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="h5" gutterBottom>
                    Cursos disponibles
                </Typography>

                {category.courses?.length > 0 ? (
                    <Grid container spacing={3}>
                        {category.courses.map((course) => (
                            <Grid item xs={12} md={6} key={course.id}>
                                <Card
                                    component={motion.div}
                                    whileHover={{ scale: 1.02 }}
                                    sx={{ height: "100%" }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {course.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            paragraph
                                        >
                                            {course.description}
                                        </Typography>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <Chip
                                                size="small"
                                                icon={<Users size={14} />}
                                                label={`${
                                                    course.students?.length || 0
                                                } estudiantes`}
                                            />
                                            <Chip
                                                size="small"
                                                icon={<Clock size={14} />}
                                                label={
                                                    course.isPublished
                                                        ? "Activo"
                                                        : "Borrador"
                                                }
                                                color={
                                                    course.isPublished
                                                        ? "success"
                                                        : "default"
                                                }
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        No hay cursos disponibles en esta categoría
                    </Alert>
                )}
            </motion.div>
        </Container>
    );
};

export default CategoryDetail;
