import { createContext } from 'react';

interface Toast {
    undo: (
        message: string,
        onUndo: () => void,
        onClose: () => void,
        setStacked: () => void
    ) => void;
    success: (message: string) => void;
    error: (message: string) => void;
}

type ToastContextType = {
    toast: Toast;
};

const ToastContext = createContext<ToastContextType>(
    null as unknown as ToastContextType
);
const ToastProvider = ToastContext.Provider;

export { ToastProvider, ToastContext };
