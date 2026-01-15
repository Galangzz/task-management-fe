import React from 'react';
import { motion } from 'framer-motion';

type ModalProps = {
    children: React.ReactNode;
    setToggle: () => void;
};

function Modal({ children, setToggle }: ModalProps) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-brightness-75"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setToggle();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                ease: 'easeInOut',
                duration: 0.1,
            }}
        >
            {children}
        </motion.div>
    );
}

export default Modal;
