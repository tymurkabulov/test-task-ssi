import React, { FC, useState } from 'react';
import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from '@mui/icons-material/Cancel';
import {ITask} from "../interfaces/ITask";


interface ModalAddTaskProps {
    isModalOpen: boolean;
    onClose: () => void;
    onAddTask: (task: ITask) => void;
}

const ModalAddTask: FC<ModalAddTaskProps> = ({ isModalOpen, onClose, onAddTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [errors, setErrors] = useState({ taskTitle: false, taskDescription: false });

    const handleSubmit = () => {
        if (taskTitle && taskDescription) {
            const newTask: ITask = {
                id: Date.now() ,
                taskTitle,
                taskDescription
            };
            onAddTask(newTask);
            onClose();
            setTaskTitle('');
            setTaskDescription('');
        } else {
            setErrors({
                taskTitle: !taskTitle,
                taskDescription: !taskDescription
            });
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper elevation={3} sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                background: '#FFFFFF',
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}>
                <Typography variant="h6" component="h2" style={{ textAlign: "center" }}>
                    Add New Task
                </Typography>
                <TextField
                    id="task-title"
                    label="Task Title"
                    variant="outlined"
                    size="small"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    error={errors.taskTitle}
                    helperText={errors.taskTitle ? 'Task title is required' : ''}
                />
                <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    error={errors.taskDescription}
                    helperText={errors.taskDescription ? 'Task description is required' : ''}
                />
                <Box width="100%" display="flex" flexDirection="column" gap="10px" mt={2}>
                    <Button
                        variant="contained"
                        endIcon={<AddTaskIcon />}
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Add Task
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        endIcon={<CancelIcon />}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
};

export default ModalAddTask;
