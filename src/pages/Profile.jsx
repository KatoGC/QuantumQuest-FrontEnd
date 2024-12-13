import { useState, useEffect } from "react";
import {
    Avatar,
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    LinearProgress,
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import EditProfileDialog from "../components/EditProfileDialog";
import { motion } from "framer-motion";
import api from "../services/api";

const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEnrolledCourses();
    }, [user.id]);

    const loadEnrolledCourses = async () => {
        try {
            const response = await api.get(
                `/users/${user.id}/enrolled-courses`
            );
            console.log("Enrolled courses response:", response.data);
            setEnrolledCourses(response.data.data);
        } catch (error) {
            console.error("Error loading courses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditProfile = (profileData) => {
        updateProfile(profileData);
    };

    if (loading)
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );

    const completedCourses = enrolledCourses.filter(
        (course) => course.progress === 100
    );
    const totalStudyTime = enrolledCourses.reduce(
        (total, course) => total + course.totalLessons * 30,
        0
    ); // Asumiendo 30 min por lección

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{ py: 4 }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, textAlign: "center" }}>
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mx: "auto",
                                    mb: 2,
                                }}
                            >
                                {user?.name?.charAt(0) ||
                                    user?.email?.charAt(0)}
                            </Avatar>
                            <Typography variant="h5" gutterBottom>
                                {user?.name || user?.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user?.bio || "No bio added yet"}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditDialogOpen(true)}
                                sx={{ mt: 2 }}
                            >
                                Editar Perfil
                            </Button>
                        </Paper>

                        <Paper sx={{ p: 3, mt: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Estadísticas
                            </Typography>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Cursos Inscritos"
                                        secondary={enrolledCourses.length}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Cursos Completados"
                                        secondary={completedCourses.length}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Tiempo Total de Estudio"
                                        secondary={`${Math.round(
                                            totalStudyTime / 60
                                        )} horas`}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>
                            Mis Cursos
                        </Typography>
                        <Grid container spacing={3}>
                            {enrolledCourses.length > 0 ? (
                                enrolledCourses.map((course) => (
                                    <Grid item xs={12} key={course.id}>
                                        <Card
                                            component={motion.div}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <CardContent>
                                                <Typography variant="h6">
                                                    {course.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    Instructor:{" "}
                                                    {course.instructor}
                                                </Typography>

                                                <Box sx={{ mb: 2 }}>
                                                    <Typography variant="body2">
                                                        Progreso:{" "}
                                                        {Math.round(
                                                            course.progress
                                                        )}
                                                        %
                                                    </Typography>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={course.progress}
                                                        sx={{ mt: 1 }}
                                                    />
                                                </Box>

                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    Último acceso:{" "}
                                                    {new Date(
                                                        course.lastAccessed
                                                    ).toLocaleDateString()}
                                                </Typography>

                                                <Button
                                                    variant="contained"
                                                    href={`/courses/${course.id}`}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Continuar Curso
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Paper sx={{ p: 3, textAlign: "center" }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                        >
                                            No estás inscrito en ningún curso
                                            todavía.
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            href="/courses"
                                            sx={{ mt: 2 }}
                                        >
                                            Explorar Cursos
                                        </Button>
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <EditProfileDialog
                open={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                currentUser={user}
                onSave={handleEditProfile}
            />
        </Box>
    );
};

export default Profile;
