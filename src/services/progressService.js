
export const progressService = {
    async completeLesson(courseId, lessonId) {
        const response = await fetch(`/courses/${courseId}/lessons/${lessonId}/complete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error al completar la lección");
        }
        return response.json();
    },

    async getCourseProgress(courseId) {
        const response = await fetch(`/courses/${courseId}/progress`);
        return response.json();
    },
};
