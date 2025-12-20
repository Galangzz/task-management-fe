import React from 'react';

function SuccessNotification({ data }) {
    return (
        <div className="flex flex-col bg-(--toast-bg) p-2!">
            <h1 className="font-bold">{data?.message}</h1>
        </div>
    );
}

export default SuccessNotification;
