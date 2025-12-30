import { createContext } from 'react';
import type ApiError from '../errors/ApiError.js';

interface Toast {
    undo: (
        message: string,
        onUndo: () => void,
        onClose: () => void,
        setStacked: () => void
    ) => void;
    success: (message: string) => void;
    error: (message: Error | ApiError) => void;
}

type ToastContextType = {
    toast: Toast;
};

const ToastContext = createContext<ToastContextType>(
    null as unknown as ToastContextType
);
const ToastProvider = ToastContext.Provider;

export { ToastProvider, ToastContext };
