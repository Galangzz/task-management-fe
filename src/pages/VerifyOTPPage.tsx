import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpCard from '../components/Auth/Otp/OtpCard.js';
import OtpForm from '../components/Auth/Otp/OtpForm.js';
import useOTP from '../hooks/useOTP.js';

function VerifyOTPPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const email: string | null = state?.email;

    useEffect(() => {
        if (!email) {
            navigate('/', { replace: true });
        }
    }, [email]);

    const {
        otp,
        inputsRef,
        handleChange,
        handleKeyDown,
        handlePaste,
        handleClick,
        seconds,
        isRunning,
        handleResendOTP,
    } = useOTP(email!);

    const formatTime = (s: number) => `0:${s < 10 ? `0${s}` : s}`;

    return (
        <div className="flex h-screen w-screen items-center justify-center ">
            <OtpCard>
                <h1>Silahkan Cek Email dan kirim OTP</h1>
                <OtpForm
                    otp={otp}
                    inputsRef={inputsRef}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    handlePaste={handlePaste}
                    handleClick={handleClick}
                />

                <p>
                    Tidak mendapatakan Email?{' '}
                    <button
                        type="button"
                        className="text-blue-400!"
                        disabled={isRunning}
                        onClick={handleResendOTP}
                    >
                        Kirim ulang {isRunning && formatTime(seconds)}
                    </button>
                </p>
            </OtpCard>
        </div>
    );
}

export default VerifyOTPPage;
