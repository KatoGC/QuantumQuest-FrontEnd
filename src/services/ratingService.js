import api from './api';

export const ratingService = {
    async rateCourse(courseId, rating) {
        return (await api.post(`/courses/${courseId}/rate`, {
            rating,
            completed: true
        })).data;
    },

    async getCourseRatings(courseId) {
        return (await api.get(`/courses/${courseId}/ratings`)).data;
    }
};