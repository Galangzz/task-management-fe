import React from 'react';

type active = 'LOGIN' | 'REGISTER' | 'NULL';

type LoginInfoProps = {
    active: active;
    setActive: React.Dispatch<React.SetStateAction<active>>;
    resetEmail: () => void;
    resetPassword: () => void;
    isLoadingLogin: boolean;
};

function LoginInfo({
    active,
    setActive,
    resetEmail,
    resetPassword,
    isLoadingLogin,
}: LoginInfoProps) {
    return (
        <div
            className={`transition-translate! absolute left-0 z-2 flex h-full w-1/2 flex-col justify-center p-4! text-center delay-300! duration-700! ease-in-out! max-md:top-0 max-md:h-1/4 max-md:w-full max-md:flex-row ${active === 'REGISTER' && '-translate-x-100 opacity-0 max-md:-translate-y-100'}`}
        >
            <h1 className="flex items-center justify-center text-3xl font-bold text-balance italic max-md:text-2xl max-sm:text-xl">
                Halo Silahkan Login terlebih dahulu
            </h1>
            <div className="flex flex-col items-center justify-center overflow-hidden max-md:p-2! max-md:text-xs">
                <h2 className="tracking-wider md:mt-8!">
                    Tidak mempunyai akun?
                </h2>
                <button
                    type="button"
                    className="mx-auto! w-fit rounded-full bg-(--add-button) px-4! py-2! font-bold hover:brightness-90 md:my-2!"
                    onClick={() => {
                        resetEmail();
                        resetPassword();
                        setActive('REGISTER');
                    }}
                    disabled={isLoadingLogin}
                >
                    SignUp
                </button>
            </div>
        </div>
    );
}

export default LoginInfo;
