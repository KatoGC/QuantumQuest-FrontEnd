import api from "./api";

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post("/api/auth/login", credentials);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                // También guardamos la información básica del usuario
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post("/api/auth/register", userData);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }
            return response.data;
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get("/api/auth/me");
            // Actualizamos la información del usuario en localStorage
            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }
            return response.data;
        } catch (error) {
            console.error("Get current user error:", error);
            // Si hay un error, limpiamos el localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            throw error;
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await api.put("/api/users/profile", profileData);
            if (response.data.success) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            throw error.response?.data?.message || 'Error updating profile';
        }
    },

    verifyEmail: async (token) => {
        const response = await api.get(`/api/auth/verify-email/${token}`);
        return response.data;
    },

    resendVerification: async (email) => {
        const response = await api.post("/api/auth/resend-verification", { email });
        return response.data;
    },

    // Método helper para verificar si hay una sesión activa
    isAuthenticated: () => {
        return !!localStorage.getItem("token");
    },

    // Método helper para obtener el usuario actual del localStorage
    getStoredUser: () => {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
    },
};

export default authService;
