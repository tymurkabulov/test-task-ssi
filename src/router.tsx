import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LoginComponent from "./components/LoginComponent";
import TaskListComponent from "./components/TaskListComponent";
import ProtectedRouteComponent from "./components/ProtectedRouteComponent";
import AddTaskPage from "./components/AddTaskPage";
import EditTaskPage from "./components/EditTaskPage";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout />, children: [
            { index: true, element: <Navigate to={'login'} /> },
            {
                path: 'login', element: <LoginComponent />
            },
            {
                path: '', element: <ProtectedRouteComponent />, children: [
                    {
                        path: 'tasks', element: <TaskListComponent />
                    },
                    {
                        path: 'tasks/add-task', element: <AddTaskPage />
                    },
                    {
                        path: 'tasks/edit-task/:taskId', element: <EditTaskPage />
                    },
                ]
            },
        ]
    }
]);

export { router };