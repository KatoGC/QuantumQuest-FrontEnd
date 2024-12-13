import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Alert,
    CircularProgress,
    MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("idle"); //idle, loading, success, error

    const subjects = [
        "Consulta general",
        "Soporte tecnico",
        "Informacion de cursos",
        "Colaboracion",
        "Otro",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        // Simular envio del formulario

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setStatus("error");
            setTimeout(() => setStatus("idle", 3000));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%" }}
            >
                {status === "success" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ¡Mensaje enviado con éxito! Te contactaremos pronto.
                        </Alert>
                    </motion.div>
                )}

                {status === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Hubo un error al enviar el mansaje. Por favor,
                            intente nuevamente.
                        </Alert>
                    </motion.div>
                )}

                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                        fullWidth
                        label="Nombre"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                    />
                </Box>

                <TextField
                    select
                    fullWidth
                    label="Asunto"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                >
                    {subjects.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label="Mensaje"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                />

                <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={status === "loading"}
                    sx={{ py: 1.5 }}
                >
                    {status === "loading" ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Enviar Mensaje"
                    )}
                </Button>
            </Box>
        </motion.div>
    );
};

export default ContactForm;
