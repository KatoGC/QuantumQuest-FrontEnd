import { createContext, useState, useContext, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Inicialización inmediata desde localStorage
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkAuth = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await authService.getCurrentUser();
            if (response.success && response.user) {
                setUser(response.user);
                localStorage.setItem("user", JSON.stringify(response.user));
            }
        } catch (error) {
            console.error("Error checking auth:", error);
            setError(error.message);

            // Limpiar solo en caso de error de autenticación
            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (credentials) => {
        setError(null);
        try {
            const response = await authService.login(credentials);
            if (response.success && response.user) {
                setUser(response.user);
                localStorage.setItem("user", JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const register = async (userData) => {
        setError(null);
        try {
            const response = await authService.register(userData);
            if (response.success && response.user) {
                setUser(response.user);
                localStorage.setItem("user", JSON.stringify(response.user));
            }
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const updateProfile = async (profileData) => {
        setError(null);
        try {
            const updatedUser = await authService.updateProfile(profileData);
            if (updatedUser) {
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
            }
            return updatedUser;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        register, // Incluir en el contexto
        updateProfile, // Incluir en el contexto
        updateUser,
        checkAuth,
        isAuthenticated: !!user && !!localStorage.getItem("token"),
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};
