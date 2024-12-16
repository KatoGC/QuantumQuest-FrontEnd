import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, CheckCircle } from "lucide-react";
import api from "../services/api";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        activeCourses: 0,
        completedCourses: 0,
        courseProgress: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await api.get("/dashboard/stats/student");
            setStats(response.data.data);
        } catch (err) {
            setError("Error al cargar estadísticas");
        } finally {
            setLoading(false);
        }
    };

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Card component={motion.div} whileHover={{ y: -5 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Cursos
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                my: 2,
                            }}
                        >
                            <Box sx={{ textAlign: "center" }}>
                                <Book size={24} />
                                <Typography variant="h4">
                                    {stats.activeCourses}
                                </Typography>
                                <Typography variant="body2">Activos</Typography>
                            </Box>
                            <Box sx={{ textAlign: "center" }}>
                                <CheckCircle size={24} />
                                <Typography variant="h4">
                                    {stats.completedCourses}
                                </Typography>
                                <Typography variant="body2">
                                    Completados
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Progreso de Cursos Activos
                        </Typography>
                        {stats.courseProgress.map((course, index) => (
                            <Box
                                key={`course-${course.Course.id || index}`}
                                sx={{
                                    my: 2,
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: "action.hover",
                                        borderRadius: 1,
                                    },
                                    p: 1,
                                }}
                                onClick={() =>
                                    handleCourseClick(course.Course.id)
                                }
                            >
                                <Typography variant="body1">
                                    {course.Course.title}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={course.progressPercentage}
                                    sx={{ mt: 1, height: 10, borderRadius: 5 }}
                                />
                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                    {course.progressPercentage}% Completado
                                </Typography>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default StudentDashboard;
