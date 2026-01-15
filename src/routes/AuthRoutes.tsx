import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// const AuthPage = lazy(() => import('../pages/AuthPage.js')); ;
// const VerifyOTPPage = lazy(() => import('../pages/VerifyOTPPage.js'));
import AuthPage from '../pages/AuthPage.js';
import VerifyOTPPage from '../pages/VerifyOTPPage.js';

function AuthRoutes({ loginSuccess }: { loginSuccess: () => Promise<void> }) {
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
