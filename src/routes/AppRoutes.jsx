import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DefaultPage from '../pages/DefaultPage';
import DetailTask from '../pages/DetailTask';

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/*"
                element={<DefaultPage />}
            />
            <Route
                path="/details/:id/:taskId"
                element={<DetailTask />}
            />
        </Routes>
    );
}

export default AppRoutes;
