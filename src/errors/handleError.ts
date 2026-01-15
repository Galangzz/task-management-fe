import ApiError from './ApiError.js';

interface ToastProps {
    undo: (
        message: string,
        onUndo: () => void,
        onClose: () => void,
        setStacked: () => void
    ) => void;
    success: (message: string) => void;
    error: (message: Error | ApiError) => void;
}

export function handleError(err: unknown, toast: ToastProps) {
    if (err instanceof ApiError) {
        toast.error(err);
        return;
    }

    if (err instanceof Error) {
        toast.error(err);
        return;
    }

    toast.error(new Error('Terjadi kesalahan'));
}
