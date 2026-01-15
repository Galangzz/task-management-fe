import React from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';

function LoadingAuth() {
    return (
        <div
            className="absolute z-2 backdrop-brightness-80 flex h-screen w-screen items-center justify-center text-6xl"
            onClick={(e) => e.stopPropagation()}
        >
            <CgSpinnerTwo className="animate-spin" />
        </div>
    );
}

export default LoadingAuth;
