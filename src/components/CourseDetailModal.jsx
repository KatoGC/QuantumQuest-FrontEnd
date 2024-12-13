import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    LinearProgress,
    Typography,
    IconButton,
} from '@mui/material';
import { X } from 'lucide-react';

const CourseDetailModal = ({ open, onClose, courseDetails }) => {
    if (!courseDetails) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {courseDetails.title}
                <IconButton onClick={onClose}>
                    <X />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Estudiante</TableCell>
                            <TableCell>Progreso</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courseDetails.students?.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LinearProgress 
                                            variant="determinate" 
                                            value={student.progress} 
                                            sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
                                        />
                                        <Typography variant="body2">
                                            {student.progress}%
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
};

export default CourseDetailModal;