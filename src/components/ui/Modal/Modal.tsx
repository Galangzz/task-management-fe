import React, { Children } from 'react';

type ModalProps = {
    children: React.ReactNode;
    setToggle: () => void;
};

function Modal({ children, setToggle }: ModalProps) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-brightness-75"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation();
                setToggle();
            }}
        >
            {children}
        </div>
    );
}

export default Modal;
