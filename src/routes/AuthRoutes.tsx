import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage.js';
import VerifyOTPPage from '../pages/VerifyOTPPage.js';

function AuthRoutes({ loginSuccess }: { loginSuccess: () => void }) {
    return (
        <Routes>
            <Route
                path="/"
                element={<AuthPage loginSuccess={loginSuccess} />}
            />
            <Route
                path="/otp"
                element={<VerifyOTPPage />}
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
