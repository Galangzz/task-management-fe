import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from 'react';
import DefaultPage from '../pages/DefaultPage.js';
import DetailTask from '../pages/DetailTask.js';

function AppRoutes({ tabId }: { tabId: string }) {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to={`/${tabId}`} />}
            />
            <Route
                path="/details/:taskId"
                element={<DetailTask />}
            />
            <Route
                path="/:id"
                element={<DefaultPage />}
            />
            <Route
                path="*"
                element={<Navigate to={`/${tabId}`} />}
            />
        </Routes>
    );
}

export default AppRoutes;
