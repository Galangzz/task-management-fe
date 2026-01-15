import { useCallback } from 'react';
import useInput from '../useInput.js';
import { loginUser } from '../../services/authService.js';
import useToast from '../useToast.js';
import { useNavigate } from 'react-router-dom';
import ApiError from '../../errors/ApiError.js';

function useLogin(loginSuccess: () => void) {
    const [email, onChangeEmail, resetEmail] = useInput('');
    const [password, onChangePassword, resetPassword] = useInput('');
    const navigate = useNavigate();

    const toast = useToast();

    const handleSubmitLogin = useCallback(async () => {
        try {
            if (email === '' || password === '') {
                toast?.error(new Error('Harap lengkapi email atau password'));
                return;
            }
            await loginUser({ email, password });
            loginSuccess()
        } catch (error) {
            if (error instanceof ApiError || error instanceof Error) {
                toast?.error(error);
            } else {
                toast?.error(new Error('Terjadi kesalahan login'));
            }
        }
    }, [email, password]);

    return {
        email: {
            value: email,
            setEmail: onChangeEmail,
            reset: resetEmail,
        },
        password: {
            value: password,
            setPassword: onChangePassword,
            reset: resetPassword,
        },
        handleSubmitLogin,
    };
}

export default useLogin;
