import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    Alert,
    CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { authService } from "../services/authService";

const VerifyEmailNotice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleResendVerification = async () => {
        setLoading(true);
        setError("");
        try {
            await authService.resendVerification(email);
            setSuccess(true);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Error al reenviar el email de verificación"
            );
        } finally {
            setLoading(false);
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
                    <Typography variant="h5" component="h1" gutterBottom>
                        Verificación Pendiente
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Para acceder a esta sección, necesitas verificar tu
                        dirección de email. Por favor, revisa tu bandeja de
                        entrada en:
                        <Typography
                            variant="subtitle1"
                            sx={{ mt: 1, fontWeight: "bold" }}
                        >
                            {email}
                        </Typography>
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Email de verificación enviado exitosamente. Por
                            favor revisa tu bandeja de entrada.
                        </Alert>
                    )}

                    <Box
                        sx={{
                            mt: 3,
                            display: "flex",
                            gap: 2,
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleResendVerification}
                            disabled={loading}
                        >
                            {loading ? (
                                <CircularProgress size={24} />
                            ) : (
                                "Reenviar Email de Verificación"
                            )}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/login")}
                            disabled={loading}
                        >
                            Volver al Login
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default VerifyEmailNotice;
