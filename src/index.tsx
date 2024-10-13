import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import 'normalize.css';
import {AuthProvider} from "./components/context/AuthContext";
import {TaskProvider} from "./components/context/TaskContext";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <TaskProvider>
                <RouterProvider router={router} />
            </TaskProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);