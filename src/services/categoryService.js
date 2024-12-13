import api from "./api";

export const categoryService = {
    // Obtener todas las categorías
    getAllCategories: async ({ level, search, orderBy, orderDir } = {}) => {
        const queryParams = new URLSearchParams();
        
        if (level) {
            queryParams.append('level', String(level));
        }
        if (search) {
            queryParams.append('search', search);
        }
        if (orderBy) {
            queryParams.append('orderBy', orderBy);
        }
        if (orderDir) {
            queryParams.append('orderDir', orderDir);
        }

        const response = await api.get(`/categories?${queryParams}`);
        return response.data;
    },

    // Obtener una categoría específica
    getCategory: async (id) => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    // Crear categoría (admin)
    createCategory: async (categoryData) => {
        const response = await api.post("/categories", categoryData);
        return response.data;
    },

    // Actualizar categoría (admin)
    updateCategory: async (id, categoryData) => {
        const response = await api.put(`/categories/${id}`, categoryData);
        return response.data;
    },
};

export default categoryService;
