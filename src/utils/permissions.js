/* eslint-disable no-unused-vars */
import api from "../services/api";

export const checkCoursePermissions = async (courseId) => {
    try {
        const response = await api.get(`/courses/${courseId}`);
        const course = response.data.data;
        const user = JSON.parse(localStorage.getItem("user"));

        return course.creatorId === user.id || user.role === "admin";
    } catch (error) {
        return false;
    }
};
