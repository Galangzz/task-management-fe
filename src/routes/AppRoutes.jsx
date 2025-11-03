import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DefaultPage from '../pages/DefaultPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/*"
                    element={<DefaultPage />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
