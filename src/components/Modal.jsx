import React, { Children } from 'react';

function Modal({ children , setToggle}) {
    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm"
            onClick={setToggle}
        >
            {children}
        </div>
    );
}

export default Modal;
