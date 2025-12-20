import React from 'react';

function ErrorNotification({data}) {
    return (
        <div className="flex flex-col bg-(--toast-bg) p-2!">
            <h1 className="font-bold">{data?.error?.message}</h1>
            <p className='italic'>{data?.error?.errors}</p>
        </div>
    );
}

export default ErrorNotification;
