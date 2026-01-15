import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage.js';
import OtpPage from '../pages/OtpPage.js';

function AuthRoutes({ loginSuccess }: { loginSuccess: () => void }) {
    return (
        <Routes>
            <Route
                path="/"
                element={<AuthPage loginSuccess={loginSuccess} />}
            />
            <Route
                path="/otp"
                element={<OtpPage />}
            />
            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />
        </Routes>
    );
}

export default AuthRoutes;
