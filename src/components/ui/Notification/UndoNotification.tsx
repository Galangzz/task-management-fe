import React from 'react';

interface UndoNotificationProps {
    closeToast: (reason: boolean) => void;
    data: {
        onUndo: () => void;
        message: string;
    };
}

function UndoNotification({ closeToast, data }: UndoNotificationProps) {
    const handleUndo = () => {
        data.onUndo();
        closeToast(true);
    };

    return (
        <div className="flex w-full items-center justify-between">
            <span className="flex-1">{data.message}</span>{' '}
            <button
                className="rounded-md border border-gray-500 px-2! hover:backdrop-contrast-75 hover:transition-all! hover:duration-300! hover:ease-in-out!"
                onClick={handleUndo}
            >
                Undo
            </button>
        </div>
    );
}

export default UndoNotification;
