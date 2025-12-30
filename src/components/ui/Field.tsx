import React from 'react';
type FieldProps = {
    children: React.ReactNode;
    className?: string;
};

function Field({ children, className }: FieldProps) {
    return (
        <div
            className={`relative flex h-fit w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-(--background-header) p-4! ${className}`}
        >
            {children}
        </div>
    );
}

export default Field;
