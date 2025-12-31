import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DefaultPage from '../pages/DefaultPage.js';
import DetailTask from '../pages/DetailTask.js';
import AuthPage from '../pages/AuthPage.js';
import OtpPage from '../pages/VerifyOTPPage.js';

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/details/:id/:taskId"
                element={<DetailTask />}
            />
            <Route
                path="/*"
                element={<DefaultPage />}
            />
        </Routes>
    );
}

export default AppRoutes;
