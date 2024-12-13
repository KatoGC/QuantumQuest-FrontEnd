import { useState, useEffect } from "react";
import {
    Container,
    Box,
    Typography,
    Tabs,
    Tab,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Skeleton,
    Alert,
    Chip,
    Divider,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Book,
    Users,
    Calendar,
    Search,
    ArrowUp,
    ArrowDown,
} from "lucide-react";
import { categoryService } from "../services/categoryService";

const CategoriesView = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLevel, setCurrentLevel] = useState("secundaria");
    const [searchTerm, setSearchTerm] = useState("");
    const [orderBy, setOrderBy] = useState("grade");
    const [orderDir, setOrderDir] = useState("ASC");
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            loadCategories();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Cargar categorías cuando cambia el nivel
    useEffect(() => {
        loadCategories();
    }, [currentLevel, orderBy, orderDir]);

    const loadCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await categoryService.getAllCategories({
                level: currentLevel,
                search: searchTerm,
                orderBy,
                orderDir,
            });

            // Filtrar y ordenar las categorías antes de agruparlas
            const filteredCategories = response.data.filter(
                (category) =>
                    !searchTerm ||
                    category.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    category.description
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );

            setCategories(filteredCategories);
        } catch (err) {
            setError(
                err.response?.data?.message || "Error al cargar las categorías"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleOrderChange = (evernt) => {
        setOrderBy(evernt.target.value);
    };

    const toggleOrderDirection = () => {
        setOrderDir(orderDir === "ASC" ? "DESC" : "ASC");
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/categories/${categoryId}`);
    };

    // Agrupar categorías por grado
    const categoriesByGrade = categories.reduce((acc, category) => {
        if (!acc[category.grade]) {
            acc[category.grade] = [];
        }
        acc[category.grade].push(category);
        return acc;
    }, {});

    // Animación para las cards
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    // Componente para el Skeleton loader
    const CategorySkeleton = () => (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardContent>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton
                        variant="text"
                        width="100%"
                        height={20}
                        sx={{ mt: 1 }}
                    />
                    <Skeleton variant="text" width="100%" height={20} />
                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <Skeleton variant="rounded" width={80} height={24} />
                        <Skeleton variant="rounded" width={80} height={24} />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
                sx={{
                    mb: 4,
                    background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Categorías por Nivel Educativo
            </Typography>

            {/* Campo de búsqueda */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar categorías..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} color="#666" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        maxWidth: 600,
                        mx: "auto",
                        display: "block",
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                                borderColor: "#2196F3",
                            },
                        },
                    }}
                />
            </Box>

            {/* Controles de ordenamiento */}
            <Box sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}>
                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel>Ordenar por</InputLabel>
                    <Select
                        value={orderBy}
                        label="Ordenar por"
                        onChange={handleOrderChange}
                    >
                        <MenuItem value="grade">Grado</MenuItem>
                        <MenuItem value="name">Nombre</MenuItem>
                        <MenuItem value="courseCount">
                            Cantidad de cursos
                        </MenuItem>
                    </Select>
                </FormControl>
                <Tooltip
                    title={`Ordenar ${
                        orderDir === "ASC" ? "descendente" : "ascendente"
                    }`}
                >
                    <IconButton onClick={toggleOrderDirection} color="primary">
                        {orderDir === "ASC" ? <ArrowUp /> : <ArrowDown />}
                    </IconButton>
                </Tooltip>
            </Box>

            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    mb: 4,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Tabs
                    value={currentLevel}
                    onChange={(e, newValue) => setCurrentLevel(newValue)}
                    centered
                    sx={{
                        "& .MuiTab-root": {
                            fontSize: "1.1rem",
                            textTransform: "none",
                            minWidth: 120,
                            fontWeight: 500,
                        },
                    }}
                >
                    <Tab
                        label="Secundaria"
                        value="secundaria"
                        icon={<Book size={20} />}
                        iconPosition="start"
                    />
                    <Tab
                        label="Preparatoria"
                        value="preparatoria"
                        icon={<Book size={20} />}
                        iconPosition="start"
                    />
                </Tabs>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                </Alert>
            )}

            {loading ? (
                <Grid container spacing={3}>
                    {[...Array(6)].map((_, index) => (
                        <CategorySkeleton key={index} />
                    ))}
                </Grid>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {Object.entries(categoriesByGrade)
                        .sort(
                            ([gradeA], [gradeB]) =>
                                Number(gradeA) - Number(gradeB)
                        )
                        .map(([grade, gradeCategories]) => (
                            <Box key={grade} sx={{ mb: 6 }}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    gutterBottom
                                    sx={{
                                        mb: 3,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Calendar size={24} />
                                    {`${
                                        currentLevel === "secundaria"
                                            ? "Secundaria"
                                            : "Preparatoria"
                                    } - ${grade}° Grado`}
                                </Typography>
                                <Grid container spacing={3}>
                                    {gradeCategories.map((category) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={category.id}
                                            component={motion.div}
                                            variants={cardVariants}
                                        >
                                            <Card
                                                sx={{
                                                    height: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    transition:
                                                        "transform 0.3s, box-shadow 0.3s",
                                                    "&:hover": {
                                                        transform:
                                                            "translateY(-4px)",
                                                        boxShadow: (theme) =>
                                                            theme.shadows[8],
                                                    },
                                                }}
                                            >
                                                <CardActionArea
                                                    onClick={() =>
                                                        handleCategoryClick(
                                                            category.id
                                                        )
                                                    }
                                                    sx={{
                                                        height: "100%",
                                                        p: 1,
                                                    }}
                                                >
                                                    <CardContent>
                                                        <Typography
                                                            variant="h6"
                                                            component="h3"
                                                            gutterBottom
                                                            sx={{
                                                                color: "primary.main",
                                                            }}
                                                        >
                                                            {category.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ mb: 2 }}
                                                        >
                                                            {
                                                                category.description
                                                            }
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                gap: 1,
                                                                alignItems:
                                                                    "center",
                                                                mt: "auto",
                                                            }}
                                                        >
                                                            <Chip
                                                                icon={
                                                                    <Users
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                }
                                                                label={`${
                                                                    category.courseCount ||
                                                                    0
                                                                } cursos`}
                                                                size="small"
                                                                color="primary"
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Divider sx={{ mt: 4 }} />
                            </Box>
                        ))}
                </motion.div>
            )}

            {!loading && categories.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                        No hay categorías disponibles para este nivel
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default CategoriesView;
