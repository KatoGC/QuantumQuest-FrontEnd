import api from "./api";

export const progressService = {
    async completeLesson(courseId, lessonId) {
        return (await api.post(`/courses/${courseId}/lessons/${lessonId}/complete`)).data;
    },

    async getCourseProgress(courseId) {
        return (await api.get(`/courses/${courseId}/progress`)).data;
    }
};
