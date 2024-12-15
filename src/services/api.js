import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});
console.log("API Base URL:", import.meta.env.VITE_APP_BACKEND_URL);

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Request config:", {
            url: config.url,
            method: config.method,
            headers: config.headers,
        });
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => {
        console.log("Response:", {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });
        return response;
    },
    (error) => {
        console.error("Response error:", {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
        });

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            // En lugar de redirigir directamente, emitimos un evento
            window.dispatchEvent(new CustomEvent("auth-error"));
        }
        return Promise.reject(error);
    }
);

export default api;
