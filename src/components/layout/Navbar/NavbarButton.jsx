import React from 'react';

function NavbarButton({ children, active = 'false', onClick, ...rest }) {
    const isActive = active === 'true';

    return (
        <button
            type="button"
            className={`
                flex
                relative
                items-center
                justify-center
                cursor-pointer
                p-4!
                border-none!
                w-fit!
                h-16!

                transition!
                duration-300!
                ease-in-out!

                before:content-['']
                before:h-1! 
                before:rounded-2xl
                before:fixed
                before:bottom-0
                before:z-10
                before:m-0.5

                before:transition-all!
                before:duration-300!
                before:ease-in-out!
                    
                hover:backdrop-contrast-75
                

                ${isActive ? ' before:w-2/3! before:rounded-2xl before:bg-(--underline-navbar)!' : 'before:w-0! before:bg-transparent'}
            `}
            active={active}
            onClick={() => onClick()}
            {...rest}
        >
            {children}
        </button>
    );
}

export default NavbarButton;
