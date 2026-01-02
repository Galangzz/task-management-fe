import { useCallback, useState } from 'react';
import useInput from '../useInput.js';
import useToast from '../useToast.js';
import { passwordChecker, emailChecker } from '../../utils/authHelper.js';
import { signUpUser } from '../../services/authService.js';
import { useNavigate } from 'react-router-dom';
import ApiError from '../../errors/ApiError.js';

function useRegister() {
    const [username, setUsername, resetUsername] = useInput('');
    const [email, setEmail, resetEmail] = useInput('');
    const [password, setPassword, resetPassword] = useInput('');
    const [repeatPassword, setRepeatPassword, resetRepeatPassword] =
        useInput('');

    const [isLoadingRegister, setIsLoadingRegister] = useState(false);

    const navigate = useNavigate();

    const toast = useToast();

    const handleRegeister = useCallback(async () => {
        setIsLoadingRegister(true);
        if (!username || !email || !password || !repeatPassword) {
            toast.error(new Error('Mohon lengkapi semua data'));
            return;
        }

        // username check
        if (username.trim().length > 30) {
            toast.error(
                new Error('Username karakter tidak boleh lebih dari 30')
            );
            return;
        }

        //email check
        const { err: emailErr } = emailChecker(email);
        if (emailErr) {
            toast.error(new Error(emailErr));
            return;
        }

        //password and repeatPassword check
        const { err: pwdErr } = passwordChecker(password, repeatPassword);
        if (pwdErr) {
            toast.error(new Error(pwdErr));
            return;
        }

        try {
            const result = await signUpUser({
                username,
                email,
                password,
                repeatPassword,
            });

            if (result) {
                navigate('/otp', {
                    state: {
                        email: email,
                    },
                });
            }
        } catch (error) {
            if (error instanceof Error || error instanceof ApiError) {
                toast.error(error);
                return;
            }
            toast.error(new Error('Terjadi kesalahan, harap cobalagi nanti'));
        } finally {
            setIsLoadingRegister(false);
        }
    }, [username, email, password, repeatPassword]);

    return {
        username: {
            value: username,
            set: setUsername,
            reset: resetUsername,
        },
        email: {
            value: email,
            set: setEmail,
            reset: resetEmail,
        },
        password: {
            value: password,
            set: setPassword,
            reset: resetPassword,
        },
        repeatPassword: {
            value: repeatPassword,
            set: setRepeatPassword,
            reset: resetRepeatPassword,
        },
        handleRegeister,
        isLoadingRegister,
    };
}

export default useRegister;
