import React from 'react';

function Button({
    children,
    type,
    className,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={type}
            className={className}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
