/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
    CircularProgress,
    Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { Book, Users, Award } from "lucide-react";
import api from "../services/api";
import CourseDetailModal from "../components/CourseDetailModal";

const TeacherDashboard = () => {
    const [stats, setStats] = useState({
        totalCourses: 0,
        activeCourses: 0,
        totalStudents: 0,
        courseStats: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await api.get("/dashboard/stats/teacher");
            setStats(response.data.data);
        } catch (err) {
            setError("Error al cargar estadísticas");
        } finally {
            setLoading(false);
        }
    };

    const handleCourseClick = async (courseId) => {
        try {
            const response = await api.get(
                `/dashboard/course/${courseId}/details`
            );
            setCourseDetails(response.data.data);
            setSelectedCourse(courseId);
        } catch (err) {
            setError("Error al cargar detalles del curso");
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card component={motion.div} whileHover={{ y: -5 }}>
                        <CardContent>
                            <Box sx={{ textAlign: "center" }}>
                                <Book size={24} />
                                <Typography variant="h4">
                                    {stats.totalCourses}
                                </Typography>
                                <Typography variant="body2">
                                    Cursos Creados
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card component={motion.div} whileHover={{ y: -5 }}>
                        <CardContent>
                            <Box sx={{ textAlign: "center" }}>
                                <Users size={24} />
                                <Typography variant="h4">
                                    {stats.totalStudents}
                                </Typography>
                                <Typography variant="body2">
                                    Estudiantes Totales
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card component={motion.div} whileHover={{ y: -5 }}>
                        <CardContent>
                            <Box sx={{ textAlign: "center" }}>
                                <Award size={24} />
                                <Typography variant="h4">
                                    {stats.activeCourses}
                                </Typography>
                                <Typography variant="body2">
                                    Cursos Activos
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Progreso por Curso
                            </Typography>
                            {stats.courseStats.map((course) => (
                                <Box
                                    key={course.id}
                                    sx={{
                                        my: 2,
                                        cursor: "pointer",
                                        "&:hover": {
                                            bgcolor: "action.hover",
                                        },
                                    }}
                                    onClick={() => handleCourseClick(course.id)}
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                    >
                                        <Typography variant="body1">
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {course.completedStudents} /{" "}
                                            {course.totalStudents} estudiantes
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={
                                            (course.completedStudents /
                                                course.totalStudents) *
                                            100
                                        }
                                        sx={{
                                            mt: 1,
                                            height: 10,
                                            borderRadius: 5,
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 0.5 }}
                                    >
                                        {Math.round(
                                            (course.completedStudents /
                                                course.totalStudents) *
                                                100
                                        )}
                                        % completado
                                    </Typography>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <CourseDetailModal
                open={Boolean(selectedCourse)}
                onClose={() => setSelectedCourse(null)}
                courseDetails={courseDetails}
            />
        </>
    );
};

export default TeacherDashboard;
