/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Box,
    Container,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Book, Clock } from "lucide-react";
import { courseService } from "../services/courseService";
import { useAuth } from "../context/AuthContext";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [level, setLevel] = useState("all");
    const { user } = useAuth();

    useEffect(() => {
        loadCourses();
    }, [level]);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const params = { search: searchTerm };
            if (level !== "all") params.level = level;

            const response = await courseService.getAllCourses(params);
            setCourses(response.data);
        } catch (error) {
            setError("Error al cargar los cursos");
        } finally {
            setLoading(false);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{ py: 6, px: 2 }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 4,
                    }}
                >
                    <Typography variant="h4">Cursos Disponibles</Typography>
                    {user?.role === "teacher" && (
                        <Button
                            component={RouterLink}
                            to="/courses/create"
                            variant="contained"
                            color="primary"
                        >
                            Crear Curso
                        </Button>
                    )}
                </Box>

                <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
                    <TextField
                        placeholder="Buscar cursos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search size={20} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ flexGrow: 1 }}
                    />
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Nivel</InputLabel>
                        <Select
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            label="Nivel"
                        >
                            <MenuItem value="all">Todos</MenuItem>
                            <MenuItem value="beginner">Principiante</MenuItem>
                            <MenuItem value="intermediate">Intermedio</MenuItem>
                            <MenuItem value="advanced">Avanzado</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Grid
                    container
                    spacing={3}
                    component={motion.div}
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {courses.map((course) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={course.id}
                            component={motion.div}
                            variants={item}
                        >
                            <Card
                                component={motion.div}
                                whileHover={{ scale: 1.03 }}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {course.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 2 }}
                                    >
                                        {course.description}
                                    </Typography>
                                    <Box
                                        sx={{ display: "flex", gap: 1, mb: 2 }}
                                    >
                                        <Chip
                                            icon={<Book size={16} />}
                                            label={course.level}
                                            size="small"
                                        />
                                        {course.duration && (
                                            <Chip
                                                icon={<Clock size={16} />}
                                                label={`${course.duration} min`}
                                                size="small"
                                            />
                                        )}
                                    </Box>
                                </CardContent>
                                <Box sx={{ p: 2, mt: "auto" }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        component={RouterLink}
                                        to={`/courses/${course.id}`}
                                    >
                                        Ver Curso
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Courses;
