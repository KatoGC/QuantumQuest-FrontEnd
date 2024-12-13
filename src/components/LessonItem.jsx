/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import { Play, CheckCircle } from "lucide-react";
import { progressService } from "../services/progressService";

const LessonItem = ({ lesson, index, onComplete }) => {
    const handleComplete = async () => {
        try {
            console.log(
                "Intentando completar la lección:",
                lesson.id,
                "del curso:",
                lesson.courseId
            );
            await progressService.completeLesson(lesson.courseId, lesson.id);
            onComplete(lesson.id); // Actualiza el estado del componente padre
        } catch (error) {
            console.error("Error al completar la lección:", error);
        }
    };

    return (
        <ListItem
            sx={{
                bgcolor: lesson.completed ? "action.selected" : "transparent",
                borderRadius: 1,
                my: 1,
            }}
        >
            <ListItemIcon>
                <Typography
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {index + 1}
                </Typography>
            </ListItemIcon>
            <ListItemText
                primary={lesson.title}
                secondary={
                    <Box display="flex" alignItems="center" gap={1}>
                        <Play size={16} />
                        {lesson.duration} min
                    </Box>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    onClick={handleComplete}
                    color={lesson.completed ? "success" : "default"}
                >
                    <CheckCircle />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default LessonItem;
