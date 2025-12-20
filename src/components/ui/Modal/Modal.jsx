import React, { Children } from 'react';

function Modal({ children, setToggle }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-brightness-75"
            onClick={setToggle}
        >
            {children}
        </div>
    );
}

export default Modal;
