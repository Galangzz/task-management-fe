import { LoaderCircle, Lock, Mail } from 'lucide-react';
import React from 'react';

type active = 'LOGIN' | 'REGISTER' | 'NULL';

type LoginFormProps = {
    active: active;
    email: string;
    setEmail: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    password: string;
    setPassword: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    submit: () => Promise<void>;
    isLoadingLogin: boolean;
};

function LoginForm({
    active,
    email,
    setEmail,
    password,
    setPassword,
    submit,
    isLoadingLogin,
}: LoginFormProps) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute z-20 flex h-full w-full flex-col p-6! transition-all! delay-600! duration-300! ease-in-out! ${active === 'REGISTER' && '-z-10 opacity-0'} items-center justify-center`}
        >
            <h1 className="mb-4! w-full text-center text-4xl font-extrabold">
                Login
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
                action="submit"
                className="flex flex-col gap-6 pt-4! [&_input]:rounded-2xl [&_input]:px-4! [&_input]:py-2! [&_input]:pl-12! [&_input]:text-xl [&_input]:backdrop-brightness-80 [&_input]:focus:outline-0"
            >
                <div className="relative w-full">
                    <Mail className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xl opacity-60" />
                    <input
                        type="email"
                        name="email"
                        id="email-login"
                        placeholder="Email"
                        className="w-full"
                        value={email}
                        onChange={setEmail}
                        required
                    />
                </div>
                <div className="relative w-full">
                    <Lock className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-xl opacity-60" />

                    <input
                        type="password"
                        name="password"
                        id="pwd-login"
                        placeholder="Password"
                        className="w-full"
                        value={password}
                        onChange={setPassword}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="border-primary/20 hover:border-primary m-auto! w-fit cursor-pointer rounded-full border px-4! py-2! text-xl font-semibold hover:brightness-90"
                >
                    {isLoadingLogin ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
