import api from "./api";

export const courseService = {
    getAllCourses: async (params = {}) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value) searchParams.append(key, value);
        });
        const response = await api.get(`/api/courses?${searchParams}`);
        return response.data;
    },

    getCourseById: async (id) => {
        const response = await api.get(`/api/courses/${id}`);
        return response.data;
    },

    createCourse: async (courseData) => {
        const response = await api.post("/api/courses", courseData);
        return response.data;
    },

    updateCourse: async (id, courseData) => {
        const response = await api.put(`/api/courses/${id}`, courseData);
        return response.data;
    },

    deleteCourse: async (id) => {
        const response = await api.delete(`/api/courses/${id}`);
        return response.data;
    },

    enrollCourse: async (courseId) => {
        const response = await api.post(`/api/courses/${courseId}/enroll`);
        return response.data;
    },

    getCoursesByCategory: async (categoryId) => {
        const response = await api.get(`/api/courses?categoryId=${categoryId}`);
        return response.data;
    },

    getTeacherCourses: async () => {
        const response = await api.get("/api/courses?type=teaching");
        return response.data;
    },

    getEnrolledCourses: async () => {
        const response = await api.get("/api/courses?type=enrolled");
        return response.data;
    },
};

export default courseService;
