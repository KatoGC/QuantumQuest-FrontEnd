import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Paper,
    Typography,
    CircularProgress,
    Button,
    Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { authService } from "../services/authService";

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("verifying"); // 'verifying', 'success', 'error'
    const [error, setError] = useState("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await authService.verifyEmail(token);
                setStatus("success");
            } catch (err) {
                setStatus("error");
                setError(
                    err.response?.data?.message || "Error al verificar el email"
                );
            }
        };

        verifyEmail();
    }, [token]);

    const renderContent = () => {
        switch (status) {
            case "verifying":
                return (
                    <Box sx={{ textAlign: "center" }}>
                        <CircularProgress sx={{ mb: 2 }} />
                        <Typography>
                            Verificando tu correo electrónico...
                        </Typography>
                    </Box>
                );
            case "success":
                return (
                    <Box sx={{ textAlign: "center" }}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ¡Tu correo electrónico ha sido verificado
                            exitosamente!
                        </Alert>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/login")}
                        >
                            Ir a Iniciar Sesión
                        </Button>
                    </Box>
                );
            case "error":
                return (
                    <Box sx={{ textAlign: "center" }}>
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error ||
                                "Error al verificar el correo electrónico. El enlace puede haber expirado."}
                        </Alert>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/signup")}
                        >
                            Volver al Registro
                        </Button>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{ py: 8 }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                    <Typography
                        variant="h5"
                        component="h1"
                        gutterBottom
                        textAlign="center"
                    >
                        Verificación de Correo Electrónico
                    </Typography>
                    {renderContent()}
                </Paper>
            </Container>
        </Box>
    );
};

export default EmailVerification;
