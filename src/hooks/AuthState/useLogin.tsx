import { useCallback, useState } from 'react';
import useInput from '../useInput.js';
import { loginUser } from '../../services/authService.js';
import useToast from '../useToast.js';
import { useNavigate } from 'react-router-dom';
import ApiError from '../../errors/ApiError.js';
import { AxiosError } from 'axios';
import { handleError } from '../../errors/handleError.js';

function useLogin(loginSuccess: () => Promise<void>) {
    const [email, onChangeEmail, resetEmail] = useInput('');
    const [password, onChangePassword, resetPassword] = useInput('');
    const [isLoadingLogin, setIsLoadingLogin] = useState(false);

    const toast = useToast();

    const handleSubmitLogin = useCallback(async () => {
        setIsLoadingLogin(true);
        try {
            if (email === '' || password === '') {
                toast?.error(new Error('Harap lengkapi email atau password'));
                return;
            }
            await loginUser({ email, password });
            await loginSuccess();
        } catch (error) {
            handleError(error)
        } finally {
            setIsLoadingLogin(false);
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
        isLoadingLogin,
    };
}

export default useLogin;
