import { useState } from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ratingService } from "../services/ratingService";

const CourseRating = ({ courseId, initialRating = 0, onRatingSubmit }) => {
    const [rating, setRating] = useState(initialRating);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRating = async (selectedRating) => {
        try {
            setIsSubmitting(true);
            await ratingService.rateCourse(courseId, selectedRating);
            setRating(selectedRating);
            onRatingSubmit?.(selectedRating);
        } catch (error) {
            console.error("Error al calificar:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Califica este curso
                </Typography>
                <Box display="flex" justifyContent="center" gap={1}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <IconButton
                            key={star}
                            disabled={isSubmitting}
                            onClick={() => handleRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                        >
                            {star <= (hoveredRating || rating) ? (
                                <StarIcon color="warning" />
                            ) : (
                                <StarBorderIcon color="action" />
                            )}
                        </IconButton>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default CourseRating;
