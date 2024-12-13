/* eslint-disable no-unused-vars */
import { useAuth } from "../context/AuthContext";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const navigationItems = [
        { text: "HOME", path: "/" },
        { text: "CURSOS", path: "/courses" },
        { text: "CATEGORIAS", path: "/categories" },
        { text: "DASHBOARD", path: "/dashboard" },
        ...(user
            ? [
                { text: "PERFIL", path: "/profile" },
                { text: "CERRAR SESIÓN", action: logout },
            ]
            : [
                { text: "REGISTRARSE", path: "/signup" },
                { text: "INICIAR SESIÓN", path: "/login" },
            ]),
    ];

    const drawer = (
        <Box sx={{ width: 250, pt: 2 }}>
            <List>
                {navigationItems.map((item, index) => (
                    <ListItem
                        key={item.text}
                        component={item.path ? RouterLink : "button"}
                        to={item.path}
                        onClick={() => {
                            if (item.action) item.action();
                            handleDrawerToggle();
                        }}
                        sx={{
                            textAlign: "center",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                            },
                        }}
                    >
                        <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                                sx: { fontWeight: 500 },
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const MotionButton = motion(Button);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "primary.main",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography
                            variant="h4"
                            component={RouterLink}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                fontWeight: "bold",
                                textDecoration: "none",
                                color: "inherit",
                                fontSize: { xs: "1.5rem", sm: "2rem" },
                            }}
                        >
                            QuantumQuest
                        </Typography>
                    </motion.div>

                    <Box sx={{ flexGrow: 1 }} />

                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ ml: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="right"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) : (
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            <AnimatePresence>
                                {navigationItems.map((item, index) =>
                                    item.path ? (
                                        <MotionButton
                                            key={item.text}
                                            component={RouterLink}
                                            to={item.path}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ delay: index * 0.1 }}
                                            variant={
                                                item.text === "INICIAR SESIÓN"
                                                    ? "contained"
                                                    : item.text === "REGISTRARSE"
                                                    ? "outlined"
                                                    : "text"
                                            }
                                            color={
                                                item.text === "INICIAR SESIÓN"
                                                    ? "secondary"
                                                    : "inherit"
                                            }
                                            sx={{
                                                fontWeight: 500,
                                                ...(item.text ===
                                                    "REGISTRARSE" && {
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(255, 255, 255, 0.08)",
                                                    },
                                                }),
                                                ...(item.text ===
                                                    "INICIAR SESIÓN" && {
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "secondary.dark",
                                                    },
                                                }),
                                            }}
                                        >
                                            {item.text}
                                        </MotionButton>
                                    ) : (
                                        <MotionButton
                                            key={item.text}
                                            onClick={item.action}
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{ delay: index * 0.1 }}
                                            color="secondary"
                                            sx={{ fontWeight: 500 }}
                                        >
                                            {item.text}
                                        </MotionButton>
                                    )
                                )}
                            </AnimatePresence>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
