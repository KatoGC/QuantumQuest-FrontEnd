import { useState, useEffect } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Alert,
    Box,
    Divider,
} from "@mui/material";
import { Book, Users, GraduationCap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import api from "../services/api";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        students: { secondary: 0, preparatory: 0 },
        teachers: 0,
        courses: { active: 0, completed: 0, total: 0 },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const COLORS = ["#0088FE", "#00C49F"];

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await api.get("/api/dashboard/stats/admin");
            setStats(response.data.data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Error al cargar estadísticas"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    const studentData = [
        { name: "Secundaria", value: stats.students.secondary },
        { name: "Preparatoria", value: stats.students.preparatory },
    ];

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Users size={40} color="#1976d2" />
                            <Box>
                                <Typography variant="h6">
                                    Estudiantes
                                </Typography>
                                <Typography variant="h4">
                                    {stats.students.secondary +
                                        stats.students.preparatory}
                                </Typography>
                                <Box mt={2}>
                                    <Typography variant="body2">
                                        Secundaria: {stats.students.secondary}
                                    </Typography>
                                    <Typography variant="body2">
                                        Preparatoria:{" "}
                                        {stats.students.preparatory}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={2}>
                            <GraduationCap size={40} color="#2e7d32" />
                            <Box>
                                <Typography variant="h6">Profesores</Typography>
                                <Typography variant="h4">
                                    {stats.teachers}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Book size={40} color="#ed6c02" />
                            <Box>
                                <Typography variant="h6">Cursos</Typography>
                                <Typography variant="h4">
                                    {stats.courses.total}
                                </Typography>
                                <Box mt={2}>
                                    <Typography variant="body2">
                                        Activos: {stats.courses.active}
                                    </Typography>
                                    <Typography variant="body2">
                                        Completados: {stats.courses.completed}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Distribución de Estudiantes
                        </Typography>
                        <Box height={300}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={studentData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        label
                                    >
                                        {studentData.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AdminDashboard;
