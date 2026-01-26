import { Loader2 } from 'lucide-react';
import React from 'react';

function LoadingAuth() {
    return (
        <div
            className="absolute z-2 backdrop-brightness-80 flex h-screen w-screen items-center justify-center text-6xl"
            onClick={(e) => e.stopPropagation()}
        >
            <Loader2 className="animate-spin" size={40}/>
        </div>
    );
}

export default LoadingAuth;
