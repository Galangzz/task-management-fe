import React from 'react';

function UndoNotification({ closeToast, data }) {
    const handleUndo = () => {
        data.onUndo();
        closeToast(true);
    };

    return (
        <div className="flex items-center w-full justify-between">
            <span className='flex-1'>{data.message}</span>{' '}
            <button
                className="border border-purple-400 px-2! rounded-md "
                onClick={handleUndo}
            >
                Undo
            </button>
        </div>
    );
}

export default UndoNotification;
