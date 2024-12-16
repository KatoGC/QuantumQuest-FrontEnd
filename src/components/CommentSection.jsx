import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Avatar,
    Typography,
    Paper,
} from "@mui/material";
import { Send } from "lucide-react";
import api from "../services/api";

const CommentSection = ({ courseId }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const loadComments = async () => {
            const response = await api.get(`/courses/${courseId}/comments`);
            setComments(response.data.data);
        };
        loadComments();
    }, [courseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post(`/courses/${courseId}/comments`, {
            content: comment,
        });
        setComments([response.data.data, ...comments]);
        setComment("");
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit" endIcon={<Send />}>
                    Comentar
                </Button>
            </form>

            <Box mt={3}>
                {comments.map((comment) => (
                    <Paper key={comment.id} sx={{ p: 2, mb: 2 }}>
                        <Box display="flex" gap={2}>
                            <Avatar>
                                {comment.User.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2">
                                    {comment.User.name}
                                </Typography>
                                <Typography variant="body2">
                                    {comment.content}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </Box>
        </Box>
    );
};

export default CommentSection;
