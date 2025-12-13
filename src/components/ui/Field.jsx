import React from 'react';

function Field({ children, className }) {
    return (
        <div
            className={`flex h-auto w-full max-w-4xl flex-col rounded-3xl bg-(--background-header) p-4! ${className}`}
        >
            {children}
        </div>
    );
}

export default Field;
