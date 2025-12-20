import React from 'react';
import { toast } from 'react-toastify';
import UndoNotification from '../components/ui/UndoNotification';
import ErrorNotification from '../components/ui/ErrorNotification';
import SuccessNotification from '../components/ui/SuccesNotification';

function useToast() {
    const notify = {
        undo: (message, onUndo, onClose, setStacked) =>
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
        success: (msg) =>
            toast.success(SuccessNotification, {
                data: {
                    message: msg
                },
                autoClose: 3000,
            }),
        error: (error) =>
            toast.error(ErrorNotification, {
                data: {
                    error: error,
                },
                autoClose: 3000,
            }),
    };
    return [notify];
}

export default useToast;
