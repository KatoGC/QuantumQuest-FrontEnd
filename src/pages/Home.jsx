import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    useTheme,
    Stack,
    Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    Book,
    TrendingUp,
    Psychology,
    Timer,
} from "@mui/icons-material";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";

const Home = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    // Características principales
    const features = [
        {
            icon: <Book sx={{ fontSize: 40 }} />,
            title: "Contenido Estructurado",
            description:
                "Cursos organizados de manera progresiva para un aprendizaje efectivo",
        },
        {
            icon: <TrendingUp sx={{ fontSize: 40 }} />,
            title: "Seguimiento de Progreso",
            description:
                "Monitorea tu avance y visualiza tus logros en tiempo real",
        },
        {
            icon: <Timer sx={{ fontSize: 40 }} />,
            title: "Aprende a tu Ritmo",
            description: "Flexibilidad para estudiar cuando y donde quieras",
        },
        {
            icon: <Psychology sx={{ fontSize: 40 }} />,
            title: "Ejercicios Prácticos",
            description: "Refuerza tu aprendizaje con ejercicios interactivos",
        },
    ];

    // Testimonios de usuarios
    const testimonials = [
        {
            name: "Ana García",
            role: "Estudiante de Preparatoria",
            comment:
                "QuantumQuest me ayudó a mejorar significativamente mis calificaciones en matemáticas.",
            avatar: "/api/placeholder/40/40",
        },
        {
            name: "Carlos Ruiz",
            role: "Profesor de Matemáticas",
            comment:
                "Una excelente plataforma para complementar la enseñanza en el aula.",
            avatar: "/api/placeholder/40/40",
        },
    ];

    // Estadísticas
    const stats = [
        { label: "Estudiantes Activos", value: "1,000+" },
        { label: "Cursos Disponibles", value: "20+" },
        { label: "Horas de Contenido", value: "500+" },
        { label: "Tasa de Aprobación", value: "95%" },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <Box>
            {/* Hero Section */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                    bgcolor: "background.default",
                    pt: 12,
                    pb: 6,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                component="h1"
                                variant="h2"
                                color="text.primary"
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                                }}
                            >
                                Domina las Matemáticas
                                <Typography
                                    component="span"
                                    variant="h2"
                                    color="primary.main"
                                    sx={{
                                        display: "block",
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "2.5rem",
                                            md: "3.5rem",
                                        },
                                    }}
                                >
                                    con QuantumQuest
                                </Typography>
                            </Typography>

                            <Typography
                                variant="h5"
                                color="text.secondary"
                                paragraph
                                sx={{ mb: 4 }}
                            >
                                Aprende matemáticas de manera interactiva y
                                efectiva. Personaliza tu experiencia de
                                aprendizaje y alcanza tus metas académicas.
                            </Typography>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                                sx={{ mb: 5 }}
                            >
                                <Button
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={() => navigate("/signup")}
                                    sx={{ py: 1.5, px: 4 }}
                                >
                                    Comenzar Ahora
                                </Button>
                                <Button
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate("/courses")}
                                    sx={{ py: 1.5, px: 4 }}
                                >
                                    Ver Cursos
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* Aquí podrías agregar una imagen o ilustración */}
                            <Box
                                component="img"
                                src="/api/placeholder/600/400"
                                alt="Estudiantes aprendiendo"
                                sx={{
                                    width: "100%",
                                    maxWidth: 600,
                                    height: "auto",
                                    borderRadius: 2,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Estadísticas */}
            <Box sx={{ py: 8, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <Grid container spacing={4} justifyContent="center">
                            {stats.map((stat, index) => (
                                <Grid item xs={6} md={3} key={index}>
                                    <motion.div variants={fadeInUp}>
                                        <Card
                                            component={motion.div}
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: theme.shadows[4],
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                            }}
                                            elevation={0}
                                            sx={{
                                                textAlign: "center",
                                                bgcolor: "transparent",
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="h3"
                                                    color="primary.main"
                                                    gutterBottom
                                                >
                                                    {stat.value}
                                                </Typography>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="text.secondary"
                                                >
                                                    {stat.label}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>

            {/* Características */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <Typography
                            variant="h3"
                            align="center"
                            gutterBottom
                            sx={{ mb: 6 }}
                        >
                            ¿Por qué elegir QuantumQuest?
                        </Typography>
                        <Grid container spacing={4}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <motion.div variants={fadeInUp}>
                                        <Card
                                            component={motion.div}
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: theme.shadows[4],
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                            }}
                                            elevation={0}
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                bgcolor: "transparent",
                                            }}
                                        >
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        color: "primary.main",
                                                        mb: 2,
                                                    }}
                                                >
                                                    {feature.icon}
                                                </Box>
                                                <Typography
                                                    variant="h5"
                                                    component="h3"
                                                    gutterBottom
                                                >
                                                    {feature.title}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                >
                                                    {feature.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>

            {/* Testimonios */}
            <Box sx={{ py: 8, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <Typography
                            variant="h3"
                            align="center"
                            gutterBottom
                            sx={{ mb: 6 }}
                        >
                            Lo que dicen nuestros estudiantes
                        </Typography>
                        <Grid container spacing={4}>
                            {testimonials.map((testimonial, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <motion.div variants={fadeInUp}>
                                        <Card
                                            component={motion.div}
                                            whileHover={{
                                                scale: 1.02,
                                                boxShadow: theme.shadows[4],
                                            }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                            }}
                                            elevation={1}
                                            sx={{
                                                height: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant="body1"
                                                    paragraph
                                                    sx={{ mb: 3 }}
                                                >
                                                    "{testimonial.comment}"
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Avatar
                                                        src={testimonial.avatar}
                                                        sx={{ mr: 2 }}
                                                    />
                                                    <Box>
                                                        <Typography variant="subtitle1">
                                                            {testimonial.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {testimonial.role}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="md">
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <Card
                            component={motion.div}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: theme.shadows[4],
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                            }}
                            sx={{
                                textAlign: "center",
                                p: 6,
                                bgcolor: "primary.main",
                                color: "background.paper",
                            }}
                        >
                            <Typography variant="h4" gutterBottom>
                                Comienza tu viaje de aprendizaje hoy
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                paragraph
                                sx={{ mb: 4 }}
                            >
                                Únete a nuestra comunidad y transforma tu
                                comprensión de las matemáticas
                            </Typography>
                            <Button
                                component={motion.button}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => navigate("/signup")}
                                sx={{ py: 1.5, px: 4 }}
                            >
                                Registrarse Gratis
                            </Button>
                        </Card>
                    </motion.div>
                </Container>
            </Box>

            {/* Sección de Contacto */}
            <Box sx={{ py: 8, bgcolor: "background.paper" }}>
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            variant="h3"
                            align="center"
                            gutterBottom
                            sx={{ mb: 6 }}
                        >
                            Contáctanos
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            color="text.secondary"
                            sx={{ mb: 4 }}
                        >
                            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
                        </Typography>
                        <Card
                            elevation={2}
                            sx={{ p: 4 }}
                            component={motion.div}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: theme.shadows[4],
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                            }}
                        >
                            <ContactForm />
                        </Card>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
