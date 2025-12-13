import React from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';

function LoadingPage() {
    return (
        <div className="bg(--background-header) flex h-screen w-screen items-center justify-center text-6xl">
            <CgSpinnerTwo className="animate-spin" />
        </div>
    );
}

export default LoadingPage;
