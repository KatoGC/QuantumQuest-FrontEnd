import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Tabs,
    Tab,
    Button,
    LinearProgress,
    Grid,
    Chip,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Clock, Award, Users, ArrowRight, Edit } from "lucide-react";
import api from "../services/api";
import LessonItem from "../components/LessonItem";

const CourseDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canEdit, setCanEdit] = useState(false);
    const [error, setError] = useState(null);
    const [tabValue, setTabValue] = useState(0);
    const [userProgress, setUserProgress] = useState(0);
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        const checkPermissions = () => {
            const isOwner = course?.creator?.id === user?.id;
            const isAdmin = user?.role === "admin";
            setCanEdit(isOwner || isAdmin);
        };
        checkPermissions();
    }, [course, user]);

    useEffect(() => {
        loadCourseAndProgress();
    }, [id]);

    const loadCourseAndProgress = async () => {
        try {
            setLoading(true);
            const [courseResponse, lessonsResponse] = await Promise.all([
                api.get(`/courses/${id}`),
                api.get(`/courses/${id}/lessons`),
            ]);

            const courseData = courseResponse.data.data;
            const lessonsData = lessonsResponse.data.data;

            setCourse({
                ...courseData,
                lessons: lessonsData,
            });
            setEnrolled(courseData.enrolled);

            if (enrolled) {
                const progressResponse = await api.get(
                    `/courses/${id}/progress`
                );
                setUserProgress(progressResponse.data.data.progressPercentage);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error al cargar el curso");
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        try {
            const response = await api.post(`/courses/${id}/enroll`);
            if (response.data.success) {
                setEnrolled(true);
                loadCourseAndProgress();
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Error al inscribirse al curso"
            );
        }
    };

    const handleLessonComplete = async (lessonId) => {
        try {
            await api.post(`/lessons/${lessonId}/complete`);
            const updatedLessons = course.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, completed: true } : lesson
            );
            setCourse({ ...course, lessons: updatedLessons });
            await loadCourseAndProgress();
        } catch (err) {
            setError(
                err.response?.data?.message || "Error al completar la lección"
            );
        }
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!course) return null;

    return (
        <Box maxWidth="lg" mx="auto" p={4}>
            <Card>
                <CardContent>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        mb={4}
                    >
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                {course.title}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                >
                                    Por {course.creator?.name}
                                </Typography>
                                <Chip
                                    label={course.level}
                                    color="primary"
                                    size="small"
                                />
                            </Box>
                        </Box>

                        {user?.role === "teacher" && canEdit && (
                            <Button
                                variant="outlined"
                                startIcon={<Edit />}
                                onClick={() => navigate(`/courses/${id}/edit`)}
                            >
                                Editar Curso
                            </Button>
                        )}

                        {!enrolled && (
                            <Button
                                variant="contained"
                                onClick={handleEnroll}
                                endIcon={<ArrowRight />}
                            >
                                Inscribirse
                            </Button>
                        )}
                    </Box>

                    {enrolled && (
                        <Box mb={3}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                mb={1}
                            >
                                <Typography variant="body2">
                                    Progreso del curso
                                </Typography>
                                <Typography variant="body2">
                                    {userProgress}%
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={userProgress}
                            />
                        </Box>
                    )}

                    <Tabs
                        value={tabValue}
                        onChange={(_, newValue) => setTabValue(newValue)}
                        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
                    >
                        <Tab label="Descripción" />
                        <Tab label="Contenido" />
                        {enrolled && <Tab label="Recursos" />}
                    </Tabs>

                    <Box role="tabpanel" hidden={tabValue !== 0}>
                        {tabValue === 0 && (
                            <>
                                <Typography paragraph>
                                    {course.description}
                                </Typography>
                                <Grid container spacing={3} mt={2}>
                                    <Grid item xs={6} sm={3}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Users size={20} />
                                            <Typography>
                                                {course.stats?.enrolledStudents}{" "}
                                                Estudiantes
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <BookOpen size={20} />
                                            <Typography>
                                                {course.lessons?.length || 0}{" "}
                                                Lecciones
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Award size={20} />
                                            <Typography>
                                                {
                                                    course.stats
                                                        ?.completedStudents
                                                }{" "}
                                                Completados
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <Clock size={20} />
                                            <Typography>
                                                Acceso ilimitado
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Box>

                    <Box role="tabpanel" hidden={tabValue !== 1}>
                        {tabValue === 1 &&
                            course.lessons?.map((lesson, index) => (
                                <LessonItem
                                    key={lesson.id}
                                    lesson={{ ...lesson, courseId: course.id }} // Incluye courseId aquí
                                    index={index}
                                    onComplete={handleLessonComplete}
                                />
                            ))}
                    </Box>

                    {enrolled && (
                        <Box role="tabpanel" hidden={tabValue !== 2}>
                            {tabValue === 2 &&
                                course.resources?.map((resource) => (
                                    <Box
                                        key={resource.id}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        p={2}
                                    >
                                        <Typography>
                                            {resource.title}
                                        </Typography>
                                        <Button variant="outlined" size="small">
                                            Descargar
                                        </Button>
                                    </Box>
                                ))}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default CourseDetail;
