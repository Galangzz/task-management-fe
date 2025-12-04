import React from 'react';

function Field({children, className}) {
    return (
            <div className={`flex flex-col w-full max-w-4xl h-auto bg-(--background-header) rounded-3xl p-4! ${className}`}>
                {children}
            </div>
        
    );
}

export default Field;
