import React from 'react';

function UndoNotification({ closeToast, data }) {
    const handleUndo = () => {
        data.onUndo();
        closeToast(true);
    };

    return (
        <div className="flex items-center w-full">
            <span>{data.message}</span>{' '}
            <button
                className="border border-purple-400 ml-auto px-2 rounded-md "
                onClick={handleUndo}
            >
                Undo
            </button>
        </div>
    );
}

export default UndoNotification;
