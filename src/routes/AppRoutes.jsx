import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DefaultPage from '../pages/DefaultPage';
import DetailTask from '../pages/DetailTask';
import useTheme from '../hooks/useTheme';
import { ThemeProvider } from '../context/Theme';

function AppRoutes() {
    const [theme, toggleTheme] = useTheme();

    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
            <BrowserRouter>
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
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default AppRoutes;
