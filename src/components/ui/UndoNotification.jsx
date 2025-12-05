import React from 'react';

function UndoNotification({ closeToast, data }) {
    const handleUndo = () => {
        data.onUndo();
        closeToast(true);
    };

    return (
        <div className="flex items-center w-full justify-between">
            <span className="flex-1">{data.message}</span>{' '}
            <button
                className="border border-gray-500 px-2! rounded-md 
                hover:transition-all!
                hover:duration-300!
                hover:ease-in-out!
                hover:backdrop-contrast-75 
                
                "
                onClick={handleUndo}
            >
                Undo
            </button>
        </div>
    );
}

export default UndoNotification;
