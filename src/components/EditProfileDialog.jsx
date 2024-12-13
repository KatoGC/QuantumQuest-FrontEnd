/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Avatar,
    IconButton,
    Typography,
} from "@mui/material";
import { CameraAlt as CameraIcon } from "@mui/icons-material";

const EditProfileDialog = ({ open, onClose, currentUser, onSave }) => {
    const [formData, setFormData] = useState({
        name: currentUser?.name || "",
        email: currentUser?.email || "",
        bio: currentUser?.bio || "",
    });
    const [profileImage, setProfileImage] = useState(
        currentUser?.profileImage || null
    );
    const [previewUrl, setPreviewUrl] = useState(
        currentUser?.profileImage || ""
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            // Crear URL para previsualización
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        // Aquí enviarías los datos al backend
        onSave({ ...formData, profileImage });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        pt: 2,
                    }}
                >
                    {/* Sección de la foto de perfil */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Box sx={{ position: "relative" }}>
                            <Avatar
                                src={previewUrl}
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mb: 1,
                                }}
                            >
                                {!previewUrl && formData.name?.charAt(0)}
                            </Avatar>
                            <IconButton
                                component="label"
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: "primary.main",
                                    "&:hover": {
                                        backgroundColor: "primary.dark",
                                    },
                                }}
                            >
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <CameraIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Haz clic en el ícono de la cámara para cambiar tu
                            foto
                        </Typography>
                    </Box>

                    {/* Campos del formulario */}
                    <TextField
                        name="name"
                        label="Nombre"
                        fullWidth
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="email"
                        label="Correo Electrónico"
                        fullWidth
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                    />
                    <TextField
                        name="bio"
                        label="Biografía"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default EditProfileDialog;
