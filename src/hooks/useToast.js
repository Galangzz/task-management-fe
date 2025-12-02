import React from 'react';
import { toast } from 'react-toastify';
import UndoNotification from '../components/ui/UndoNotification';

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
        success: (msg) => toast.success(msg),
        error: (msg) => toast.error(msg),
    };
    return [notify];
}

export default useToast;
