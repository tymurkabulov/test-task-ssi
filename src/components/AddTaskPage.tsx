import React, {FC, useState} from 'react';
import ModalAddTask from "../components/taskActions/ModalAddTask";
import { useNavigate } from "react-router-dom";
import {useTaskContext} from "./context/TaskContext";
import {ITask} from "./interfaces/ITask";


const AddTaskPage:FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate();
    const { addTask } = useTaskContext();

    const handleClose = () => {
        setIsModalOpen(false);
        navigate('/tasks');
    };

    const handleAddTask = (newTask: ITask) => {
        addTask(newTask);
        handleClose();
    };

    return (
        <ModalAddTask
            isModalOpen={isModalOpen}
            onClose={handleClose}
            onAddTask={handleAddTask}
        />
    );
};

export default AddTaskPage;