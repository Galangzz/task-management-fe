import React from 'react';

type active = 'LOGIN' | 'REGISTER' | 'NULL';

type SignUpInfoProps = {
    active: active;
    setActive: React.Dispatch<React.SetStateAction<active>>;
    isLoadingRegister: boolean;
};

function SignUpInfo({ active, setActive, isLoadingRegister }: SignUpInfoProps) {
    return (
        <div
            className={`absolute right-0 z-2 flex h-full w-1/2 translate-x-1/1 flex-col justify-center p-4! text-center opacity-0 transition-all! delay-300! duration-700! ease-in-out! max-md:bottom-0 max-md:h-1/4 max-md:w-full max-md:translate-y-full max-md:flex-row ${active === 'REGISTER' && 'translate-x-0! opacity-100 max-md:translate-y-0!'}`}
        >
            <h1 className="flex items-center justify-center text-3xl font-bold text-balance italic max-md:text-2xl max-sm:text-xl">
                Silahkan daftarkan akunmu
            </h1>
            <div className="flex flex-col items-center justify-center overflow-hidden max-md:p-2! max-md:text-xs">
                <h2 className="mt-8! tracking-wider">Sudah memiliki akun?</h2>
                <button
                    type="button"
                    className="mx-auto! my-2! w-fit rounded-full bg-(--add-button) px-4! py-2! font-bold hover:brightness-90"
                    onClick={() => setActive('LOGIN')}
                    disabled={isLoadingRegister}
                >
                    SignIn
                </button>
            </div>
        </div>
    );
}

export default SignUpInfo;
