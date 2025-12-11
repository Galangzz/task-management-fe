import React from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';

function LoadingPage() {
    return (
        <div className="flex justify-center items-center w-screen h-screen text-6xl bg(--background-header)">
            <CgSpinnerTwo className='animate-spin'/>
        </div>
    );
}

export default LoadingPage;
