import { Loader2 } from 'lucide-react';
import React from 'react';

function LoadingPage() {
    return (
        <div className=" flex h-screen w-screen items-center justify-center text-6xl">
            <Loader2 className="animate-spin" size={40}/>
        </div>
    );
}

export default LoadingPage;
