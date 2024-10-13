import React, {createContext, useContext, useState, useEffect, ReactNode, FC} from 'react';
import {ITask} from "../interfaces/ITask";



interface TaskContextType {
    tasks: ITask[];
    addTask: (task: ITask) => void;
    deleteTask: (taskId: number) => void;
    editTask: (taskId: number, updatedTask: ITask) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('context error');
    }
    return context;
};

interface TaskProviderProps {
    children: ReactNode;
}

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const tasksString = localStorage.getItem('Task');
        if (tasksString) {
            try {
                const parsedTasks: ITask[] = JSON.parse(tasksString);
                if (Array.isArray(parsedTasks)) {
                    setTasks(parsedTasks);
                }
            } catch (error) {
                console.error("Failed to parse tasks from localStorage", error);
            }
        }
    }, []);

    const addTask = (newTask: ITask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem('Task', JSON.stringify(updatedTasks));
    };

    const deleteTask = (taskId: number) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('Task', JSON.stringify(updatedTasks));
    };

    const editTask = (taskId: number, updatedTask: ITask) => {
        const updatedTasks = tasks.map(task => task.id === taskId ? updatedTask : task);
        setTasks(updatedTasks);
        localStorage.setItem('Task', JSON.stringify(updatedTasks));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, editTask }}>
            {children}
        </TaskContext.Provider>
    );
};