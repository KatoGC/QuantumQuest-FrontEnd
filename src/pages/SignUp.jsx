/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Container,
    Alert,
    IconButton,
    InputAdornment,
    Checkbox,
    FormControlLabel,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Visibility,
    VisibilityOff,
    Google as GoogleIcon,
    Facebook as FacebookIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const SignUp = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student", // Valor por defecto
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [verificationEmailSent, setVerificationEmailSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError("");
    };

    const validateForm = () => {
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError("Todos los campos son obligatorios");
            return false;
        }

        if (!formData.email.includes("@")) {
            setError("Por favor, ingresa un correo electrónico válido");
            return false;
        }

        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return false;
        }

        if (!acceptTerms) {
            setError("Debes aceptar los términos y condiciones");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsLoading(true);
            setError("");

            const registrationData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            };

            await register(registrationData);
            setVerificationEmailSent(true);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Error al registrar el usuario. Por favor, intenta nuevamente."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            setIsLoading(true);
            setError("");
            // La implementación de autenticación social vendrá después
            console.log(`Iniciando sesión con ${provider}`);
        } catch (error) {
            setError(`Error al iniciar sesión con ${provider}`);
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
            sx={{
                py: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    component={motion.div}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    elevation={3}
                    sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Typography component="h1" variant="h4" gutterBottom>
                            Crear Cuenta
                        </Typography>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Alert
                                severity="error"
                                sx={{ width: "100%", mb: 2 }}
                            >
                                {error}
                            </Alert>
                        </motion.div>
                    )}

                    {verificationEmailSent ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Alert
                                severity="success"
                                sx={{ width: "100%", mb: 2 }}
                            >
                                Se ha enviado un correo de verificación a tu
                                dirección de email. Por favor, verifica tu
                                correo para continuar.
                            </Alert>

                            <Button
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variant="contained"
                                size="large"
                                color="secondary"
                                onClick={() => navigate("/login")}
                                sx={{ py: 1.5, px: 4 }}
                            >
                                Comenzar Ahora
                            </Button>
                        </motion.div>
                    ) : (
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{ width: "100%" }}
                        >
                            {/* Selección de rol */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Tipo de cuenta</InputLabel>
                                    <Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        label="Tipo de cuenta"
                                        disabled={isLoading}
                                    >
                                        <MenuItem value="student">
                                            Estudiante
                                        </MenuItem>
                                        <MenuItem value="teacher">
                                            Profesor
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </motion.div>

                            {/* Botones de redes sociales */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Box sx={{ mb: 3 }}>
                                    <Button
                                        component={motion.button}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<GoogleIcon />}
                                        onClick={() =>
                                            handleSocialLogin("Google")
                                        }
                                        sx={{ mb: 1 }}
                                    >
                                        Continuar con Google
                                    </Button>
                                    <Button
                                        component={motion.button}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<FacebookIcon />}
                                        onClick={() =>
                                            handleSocialLogin("Facebook")
                                        }
                                    >
                                        Continuar con Facebook
                                    </Button>
                                </Box>
                            </motion.div>

                            <Divider sx={{ my: 2 }}>
                                <Typography color="text.secondary">
                                    o
                                </Typography>
                            </Divider>

                            {/* Campos del formulario */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Nombre completo"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Correo electrónico"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Contraseña"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    edge="end"
                                                    disabled={isLoading}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar contraseña"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    autoComplete="new-password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowConfirmPassword(
                                                            !showConfirmPassword
                                                        )
                                                    }
                                                    edge="end"
                                                    disabled={isLoading}
                                                >
                                                    {showConfirmPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </motion.div>

                            {/* Términos y condiciones */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={acceptTerms}
                                            onChange={(e) =>
                                                setAcceptTerms(e.target.checked)
                                            }
                                            color="primary"
                                            disabled={isLoading}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            Acepto los{" "}
                                            <Button
                                                onClick={() =>
                                                    setShowTerms(true)
                                                }
                                                sx={{
                                                    textTransform: "none",
                                                    p: 0,
                                                    verticalAlign: "baseline",
                                                }}
                                                disabled={isLoading}
                                            >
                                                términos y condiciones
                                            </Button>
                                        </Typography>
                                    }
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <Button
                                    component={motion.button}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isLoading}
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {isLoading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        "Registrarse"
                                    )}
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.9 }}
                            >
                                <Box sx={{ textAlign: "center" }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        ¿Ya tienes una cuenta?{" "}
                                        <Button
                                            component={RouterLink}
                                            to="/login"
                                            sx={{ textTransform: "none" }}
                                            disabled={isLoading}
                                        >
                                            Iniciar sesión
                                        </Button>
                                    </Typography>
                                </Box>
                            </motion.div>
                        </Box>
                    )}
                </Paper>
            </Container>

            {/* Diálogo de Términos y Condiciones */}
            <Dialog
                open={showTerms}
                onClose={() => setShowTerms(false)}
                scroll="paper"
                maxWidth="md"
                fullWidth
                TransitionComponent={motion.div}
            >
                <DialogTitle>Términos y Condiciones</DialogTitle>
                <DialogContent dividers>
                    <Typography paragraph>
                        1. Aceptación de los términos
                    </Typography>
                    <Typography paragraph>
                        Al acceder y utilizar QuantumQuest, aceptas estar
                        legalmente vinculado por estos términos y condiciones.
                    </Typography>
                    {/* Agregar más términos según sea necesario */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowTerms(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SignUp;
