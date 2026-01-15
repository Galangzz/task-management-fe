import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function OtpPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const email: string | null = state?.email;

    useEffect(() => {
        if (!email) {
            navigate('/auth', { replace: true });
        }
    }, [email]);

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-(--background-color)">
            <h1>HELLO OTP</h1>
            <h2>{email}</h2>
        </div>
    );
}

export default OtpPage;
