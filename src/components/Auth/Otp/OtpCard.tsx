import React from 'react';

function OtpCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 bg-(--background-header) p-4! rounded-2xl inset-shadow-2xs">
            {children}
        </div>
    );
}

export default OtpCard;
