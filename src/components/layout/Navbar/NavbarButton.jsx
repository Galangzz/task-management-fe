import React from 'react';

function NavbarButton({ children, active = 'false', onClick, ...rest }) {
    const isActive = active === 'true';

    return (
        <button
            type="button"
            className={`relative flex h-16! w-fit! cursor-pointer items-center justify-center border-none! p-4! transition! duration-300! ease-in-out! before:absolute before:bottom-0 before:z-10 before:m-0.5 before:h-1! before:rounded-2xl before:transition-all! before:duration-300! before:ease-in-out! before:content-[''] hover:backdrop-contrast-75 ${isActive ? ' before:w-2/3! before:rounded-2xl before:bg-(--underline-navbar)!' : 'before:w-0! before:bg-transparent'} `}
            active={active}
            onClick={() => onClick()}
            {...rest}
        >
            {children}
        </button>
    );
}

export default NavbarButton;
