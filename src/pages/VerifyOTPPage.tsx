import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpCard from '../components/Auth/Otp/OtpCard.js';
import OtpForm from '../components/Auth/Otp/OtpForm.js';

function VerifyOTPPage() {
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
            <OtpCard>
                <h1>Silahkan Cek Email dan kirim OTP</h1>
                <OtpForm />
                <p>
                    Tidak mendapatakan Email? <span className='text-blue-400!'>Kirim ulang TIME</span>
                </p>
            </OtpCard>
        </div>
    );
}

export default VerifyOTPPage;
