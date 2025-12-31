import React, { useEffect, useState } from 'react';
import LoginForm from '../components/Auth/Login/LoginForm.js';
import LoginInfo from '../components/Auth/Login/LoginInfo.js';
import SignUpInfo from '../components/Auth/SignUp/SignUpInfo.js';
import SignUpForm from '../components/Auth/SignUp/SignUpForm.js';
import useLogin from '../hooks/AuthState/useLogin.js';
import { getLoggedUser } from '../services/authService.js';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/ui/Loading/LoadingPage.js';
import useRegister from '../hooks/AuthState/useRegister.js';

type active = 'LOGIN' | 'REGISTER' | 'NULL';

function AuthPage({ loginSuccess }: { loginSuccess: () => void }) {
    const [active, setActive] = useState<active>('NULL');
    const { email, password, handleSubmitLogin } = useLogin(loginSuccess);
    const {
        username,
        email: emailSignUp,
        password: passwordSignUp,
        repeatPassword,
        handleRegeister,
    } = useRegister();

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const checkUserLogged = async () => {
            try {
                const { id } = await getLoggedUser();
                if (id && isMounted) {
                    navigate('/', { replace: true });
                }
            } catch {
            } finally {
                setIsLoading(false);
            }
        };
        checkUserLogged();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-(--background-color) p-4!">
            <div className="max-h relative flex max-h-7/8 min-h-2/3 w-full max-w-2xl overflow-hidden rounded-3xl bg-(--background-header) shadow-2xl max-md:h-7/8! max-md:flex-col">
                <div
                    className={`transition-translate! absolute z-1 h-full w-full rounded-4xl bg-(--add-button) brightness-75 delay-300! duration-1000! ease-in-out! md:-translate-x-1/2 ${active === 'REGISTER' && 'max-md:translate-y-3/4 md:translate-x-1/2'} max-md:-translate-y-3/4`}
                ></div>
                <LoginInfo
                    active={active}
                    setActive={setActive}
                    resetEmail={email.reset}
                    resetPassword={password.reset}
                />
                <SignUpInfo
                    active={active}
                    setActive={setActive}
                />
                <div
                    className={`form absolute right-0 flex h-full w-1/2 transition-all! delay-600! duration-300! ease-in-out! max-md:bottom-0 max-md:h-3/4 max-md:w-full ${active === 'REGISTER' && 'max-md:-translate-y-1/3! md:-translate-x-full!'} `}
                >
                    <div className="relative h-full w-full">
                        <LoginForm
                            active={active}
                            email={email.value}
                            setEmail={email.setEmail}
                            password={password.value}
                            setPassword={password.setPassword}
                            submit={handleSubmitLogin}
                        />
                        <SignUpForm
                            active={active}
                            username={username.value}
                            setUsername={username.set}
                            email={emailSignUp.value}
                            setEmail={emailSignUp.set}
                            password={passwordSignUp.value}
                            setPassword={passwordSignUp.set}
                            repeatPassword={repeatPassword.value}
                            setRepeatPassword={repeatPassword.set}
                            submit={handleRegeister}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
