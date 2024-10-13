import React, {useState, useEffect, FC} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {useTaskContext} from "./context/TaskContext";
import {ITask} from "./interfaces/ITask";
import EditTaskModal from "./taskActions/ModalEditTask";


const EditTaskPage: FC = () => {

    const { taskId } = useParams<{ taskId: string }>();
    const { tasks, editTask } = useTaskContext();
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const task = tasks.find(task => task.id === Number(taskId));
        if (task) {
            setSelectedTask(task);
        } else {
            navigate('/tasks');
        }
    }, [taskId, tasks, navigate]);

    const handleClose = () => {
        setIsModalOpen(false);
        navigate('/tasks');
    };

    const handleSaveTask = (updatedTask: ITask) => {
        editTask(updatedTask.id, updatedTask);
        handleClose();
    };

    return (
        <EditTaskModal
            isModalOpen={isModalOpen}
            onClose={handleClose}
            onSave={handleSaveTask}
            task={selectedTask}
        />
    );
};

export default EditTaskPage;