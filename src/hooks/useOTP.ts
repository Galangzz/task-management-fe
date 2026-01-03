import React, { useCallback, useEffect, useRef, useState } from 'react';
import { resendOTP, verifyOTPUser } from '../services/authService.js';
import useToast from './useToast.js';
import ApiError from '../errors/ApiError.js';
import { useNavigate } from 'react-router-dom';

function useOTP(email: string) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (inputsRef.current[0]) {
            inputsRef.current[0]?.focus();
        }
    }, []);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const value = e.target.value.replace(/\D/g, '');

            if (!value) return;

            const newOtp = [...otp];
            newOtp[index] = value.substring(value.length - 1);
            setOtp(newOtp);

            if (newOtp[index] && index < 6 - 1) {
                inputsRef.current[index + 1]?.focus();
            }

            if (newOtp.every(Boolean)) {
                // onComplete(newOtp.join(''));
                // alert(newOtp.join(''));
                handleSubmit(newOtp.join(''));
            }
        },
        [otp]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === 'Backspace') {
                const newOtp = [...otp];

                if (otp[index]) {
                    newOtp[index] = '';
                    setOtp(newOtp);
                } else if (index > 0) {
                    inputsRef.current[index - 1]?.focus();
                    newOtp[index - 1] = '';
                    setOtp(newOtp);
                }
            }
        },
        [otp]
    );

    const handlePaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const paste = e.clipboardData.getData('text').replace(/\D/g, '');
            if (!paste) return;

            const newOtp = otp.map((_, i) => paste[i] || '');
            setOtp(newOtp);

            if (paste.length >= 6) {
                // onComplete(paste.slice(0, 6));
                // alert(newOtp.join(''));
                handleSubmit(newOtp.join(''));
            }
        },
        [otp]
    );

    const handleClick = useCallback(
        (index: number) => {
            inputsRef.current[index]?.setSelectionRange(1, 1);

            if (index > 0 && !otp[index - 1]) {
                inputsRef.current[otp.indexOf('')]?.focus();
            }
        },
        [otp]
    );

    const handleSubmit = useCallback(
        async (newOTP: string) => {
            try {
                await verifyOTPUser({ email, otp: newOTP });
                toast.success('Regristrasi Success, silahkan login kembali');
                localStorage.removeItem('otp_resend');
                navigate('/', { replace: true });
            } catch (error) {
                if (error instanceof ApiError || error instanceof Error) {
                    toast.error(new Error('OTP tidak valid'));
                } else {
                    toast.error(new Error('Terjadi kesalahan regristrasi'));
                }
            }
        },
        [otp]
    );

    const handleResendOTP = useCallback(async () => {
        try {
            await resendOTP(email);
            toast.success('OTP baru berhasil dikirim');
            startTimer(59);
        } catch (error) {
            if (error instanceof ApiError) {
                toast.error(error);
                if (error.status === 429) {
                    navigate('/', { replace: true });
                    localStorage.removeItem('otp_resend');
                }
            }
        }
    }, [isRunning, email]);

    useEffect(() => {
        const expiryTime = localStorage.getItem('otp_resend');

        if (expiryTime) {
            const remaining = Math.round(
                (parseInt(expiryTime) - Date.now()) / 1000
            );
            if (remaining > 0) {
                setSeconds(remaining);
                setIsRunning(true);
            } else {
                // localStorage.removeItem('otp_resend');
                return;
            }
        } else {
            startTimer(59);
        }
    }, []);

    const startTimer = (duration: number) => {
        const targetTime = Date.now() + duration * 1000;
        localStorage.setItem('otp_resend', targetTime.toString());
        setSeconds(duration);
        setIsRunning(true);
    };

    useEffect(() => {
        let interval: number;
        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        // localStorage.removeItem('otp_resend');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    return {
        otp,
        inputsRef,
        handleChange,
        handleKeyDown,
        handlePaste,
        handleClick,
        seconds,
        isRunning,
        handleResendOTP,
    };
}

export default useOTP;
