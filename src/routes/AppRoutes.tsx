import { Navigate, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React, { lazy } from 'react';
// const DefaultPage = lazy(() => import('../pages/DefaultPage.js'));
// const DetailTask = lazy(() => import('../pages/DetailTask.js'));
import DefaultPage from '../pages/DefaultPage.js';
import DetailTask from '../pages/DetailTask.js';
import ForbiddenPage from '../pages/ForbiddenPage.js';

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
                path="/forbidden"
                element={<ForbiddenPage />}
            />
            <Route
                path="*"
                element={<Navigate to={`/${tabId}`} />}
            />
        </Routes>
    );
}

export default AppRoutes;
