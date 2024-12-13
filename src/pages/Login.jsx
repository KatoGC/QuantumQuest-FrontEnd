import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion"; // Para animaciones
import authService from "../services/authService";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [needsVerification, setNeedsVerification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setNeedsVerification(false);
        setIsLoading(true);

        try {
            // Usamos el login del contexto en lugar de llamar directamente al servicio
            await login({ email, password });
            navigate("/dashboard");
        } catch (err) {
            if (
                err.response?.status === 403 &&
                err.response?.data?.needsVerification
            ) {
                setNeedsVerification(true);
                setError("Por favor verifica tu email antes de iniciar sesión");
            } else {
                setError(
                    err.response?.data?.message || "Error al iniciar sesión"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendVerification = async () => {
        setIsLoading(true);
        try {
            await authService.resendVerification(email);
            setError("");
            setNeedsVerification(false);
            alert(
                "Email de verificación enviado. Por favor revisa tu bandeja de entrada."
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Error al reenviar el email de verificación"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="80vh"
        >
            <Paper
                elevation={3}
                sx={{ padding: 4, maxWidth: 400, width: "100%" }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                >
                    Iniciar Sesión
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        action={
                            needsVerification && (
                                <Button
                                    color="inherit"
                                    size="small"
                                    onClick={handleResendVerification}
                                    disabled={isLoading}
                                >
                                    Reenviar verificación
                                </Button>
                            )
                        }
                    >
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>

                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                            ¿No tienes una cuenta?{" "}
                            <Button
                                component={RouterLink}
                                to="/signup"
                                sx={{ textTransform: "none" }}
                                disabled={isLoading}
                            >
                                Regístrate aquí
                            </Button>
                        </Typography>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
