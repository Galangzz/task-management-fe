import React from 'react';
import { CgLock, CgMail, CgPassword, CgUser } from 'react-icons/cg';
import { FaLock, FaUser } from 'react-icons/fa';

type active = 'LOGIN' | 'REGISTER' | 'NULL';

type SignUpFormProps = {
    active: active;
    username: string;
    setUsername: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    email: string;
    setEmail: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    password: string;
    setPassword: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    repeatPassword: string;
    setRepeatPassword: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    submit: () => Promise<void>;
};

function SignUpForm({
    active,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    repeatPassword,
    setRepeatPassword,
    submit,
}: SignUpFormProps) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`bg absolute -z-1 flex h-full w-full flex-col items-center justify-center p-6! opacity-0 transition-all! delay-600! duration-300! ease-in-out! ${active === 'REGISTER' && 'z-20 opacity-100'} `}
        >
            <h1 className="mb-4! w-full text-center text-4xl font-extrabold">
                SignUp
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
                action="submit"
                className="max-md: flex flex-col gap-6 pt-4! [&_input]:rounded-2xl [&_input]:px-4! [&_input]:py-2! [&_input]:text-xl [&_input]:backdrop-brightness-80 [&_input]:focus:outline-0"
            >
                <div className="flex w-full items-center justify-center gap-2">
                    <CgUser className="pointer-events-none text-2xl opacity-60" />
                    <input
                        type="text"
                        name="username"
                        id="username-register"
                        placeholder="Username"
                        className="w-full"
                        value={username}
                        onChange={setUsername}
                        required
                    />
                </div>
                <div className="flex w-full items-center justify-center gap-2">
                    <CgMail className="pointer-events-none text-2xl opacity-60" />
                    <input
                        type="text"
                        name="email"
                        id="email-register"
                        placeholder="Email"
                        className="w-full"
                        value={email}
                        onChange={setEmail}
                        required
                    />
                </div>

                <div className="flex w-full items-center justify-center gap-2">
                    <CgLock className="pointer-events-none text-2xl opacity-60" />
                    <input
                        type="password"
                        name="password"
                        id="pwd-register"
                        placeholder="Password"
                        className="w-full"
                        value={password}
                        onChange={setPassword}
                        required
                    />
                </div>

                <div className="flex w-full items-center justify-center gap-2">
                    <CgPassword className="pointer-events-none text-2xl opacity-60" />
                    <input
                        type="password"
                        name="repeat-password"
                        id="repeat-pwd-register"
                        placeholder="Repeat Password"
                        className="w-full"
                        value={repeatPassword}
                        onChange={setRepeatPassword}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="m-auto! w-fit rounded-full bg-(--add-button) px-4! py-2! text-xl font-semibold hover:brightness-90"
                >
                    SignUp
                </button>
            </form>
        </div>
    );
}

export default SignUpForm;
