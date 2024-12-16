/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Tabs, Tab, Container, Alert } from "@mui/material";
import EditCourse from "./EditCourse";
import CreateLesson from "./CreateLesson";
import api from "../services/api";

const CourseEditContainer = () => {
    const [tabValue, setTabValue] = useState(0);
    const { id } = useParams();
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState("");

    const loadLessons = async () => {
        try {
            const response = await api.get(`/api/courses/${id}/lessons`);
            setLessons(response.data.data);
        } catch (error) {
            setError("Error al cargar las lecciones");
        }
    };

    useEffect(() => {
        loadLessons();
    }, [id]);

    const handleLessonCreated = () => {
        loadLessons();
    };

    return (
        <Container maxWidth="lg">
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={(_, newValue) => setTabValue(newValue)}
                >
                    <Tab label="Información del Curso" />
                    <Tab label={`Lecciones (${lessons.length})`} />
                </Tabs>
            </Box>

            <Box role="tabpanel" hidden={tabValue !== 0}>
                {tabValue === 0 && <EditCourse courseId={id} />}
            </Box>

            <Box role="tabpanel" hidden={tabValue !== 1}>
                {tabValue === 1 && (
                    <CreateLesson
                        courseId={id}
                        onLessonCreated={handleLessonCreated}
                        existingLessons={lessons}
                    />
                )}
            </Box>
        </Container>
    );
};

export default CourseEditContainer;
