import React from 'react';

function Field({ children, className }) {
    return (
        <div
            className={`relative flex h-fit w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-(--background-header) p-4! ${className}`}
        >
            {children}
        </div>
    );
}

export default Field;
