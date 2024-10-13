import React, {FC, useState} from 'react';
import {Box, Button, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import {useTaskContext} from "./context/TaskContext";
import {useAuth} from "./context/AuthContext";


const TaskListComponent:FC = () => {
    const { tasks, deleteTask } = useTaskContext();
    const { isAuthenticated } = useAuth();
    const [checked, setChecked] = useState<number[]>([]);

    const navigate = useNavigate();

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleEditTask = (taskId: number) => {
        navigate(`/tasks/edit-task/${taskId}`);
    };

    return (
        <>
            <Box padding="20px"
                 display="flex"
                 justifyContent="flex-end"
            >
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => navigate('/tasks/add-task')}

                >
                    Add new task
                </Button>
            </Box>
            <Box display="flex"
                 justifyContent="center"
                 alignItems="center"
                 flexDirection="column"

            >
                <Paper elevation={8} sx={{padding: "20px"}}>
                    <Typography variant="h4" component="h4" textAlign="center">
                        Your task list
                    </Typography>
                    {isAuthenticated ? (
                        tasks.length > 0 ? (
                            <List sx={{ width: '100%', maxWidth: 360, backgroundColor: '#FFFFFF' }}>
                                {tasks.map((task) => {
                                    const labelId = `checkbox-list-label-${task.id}`;
                                    return (
                                        <ListItem key={task.id} disablePadding>
                                            <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.includes(task.id)}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>

                                                <Box display="flex" flexDirection="column" maxWidth="300px" style={{ wordWrap: 'break-word' }}>
                                                    <ListItemText
                                                        id="outlined-multiline-static"
                                                        primary={task.taskTitle}
                                                        secondary={task.taskDescription}
                                                        secondaryTypographyProps={{
                                                            style: {
                                                                whiteSpace: 'pre-wrap',
                                                                wordWrap: 'break-word',
                                                            },
                                                        }}
                                                    />
                                                </Box>
                                            </ListItemButton>
                                            <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        ) : (
                            <p>Use 'Add new task' to add your first task for today! </p>
                        )
                    ) : (
                        <p>Please login to view your tasks.</p>
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default TaskListComponent;