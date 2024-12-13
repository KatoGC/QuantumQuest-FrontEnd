import { Container, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import StudentDashboard from "../dashboards/StudentDashboard";
import TeacherDashboard from "../dashboards/TeacherDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";

const Dashboard = () => {
    const { user } = useAuth();

    const getDashboardComponent = () => {
        switch (user.role) {
            case "student":
                return <StudentDashboard />;
            case "teacher":
                return <TeacherDashboard />;
            case "admin":
                return <AdminDashboard />;
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            {getDashboardComponent()}
        </Container>
    );
};

export default Dashboard;
