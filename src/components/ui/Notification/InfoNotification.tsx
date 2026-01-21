import React from 'react';

function InfoNotification({ data }: { data: { message: string } }) {
    return (
        <div className="flex flex-col bg-(--toast-bg) p-2!">
            <h1 className="font-bold">{data?.message}</h1>
        </div>
    );
}

export default InfoNotification;
