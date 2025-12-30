import React from 'react';
import { toast } from 'react-toastify';
import UndoNotification from '../components/ui/Notification/UndoNotification.js';
import ErrorNotification from '../components/ui/Notification/ErrorNotification.js';
import SuccessNotification from '../components/ui/Notification/SuccesNotification.js';
import type ApiError from '../errors/ApiError.js';

function useToast() {
    const notify = {
        undo: (message: string, onUndo: () => void, onClose: () => void, setStacked: () => void) =>
            toast.info(UndoNotification, {
                onClose: (undo) => {
                    if (!undo) onClose();
                    setStacked();
                },
                data: {
                    onUndo: () => onUndo(),
                    message: message,
                },

                autoClose: 3000,
            }),
        success: (msg: string) =>
            toast.success(SuccessNotification, {
                data: {
                    message: msg
                },
                autoClose: 3000,
            }),
        error: (error: Error | ApiError) =>
            toast.error(ErrorNotification, {
                data: {
                    error: error,
                },
                autoClose: 3000,
            }),
    };
    return notify;
}

export default useToast;
