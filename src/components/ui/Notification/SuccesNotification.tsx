import React from 'react';
import { type ApiErrorType } from '../../../errors/ApiError.js';

interface SuccessNotificationProps {
    data: {
        message: string;
    };
}
function SuccessNotification({ data }: SuccessNotificationProps) {
    return (
        <div className="flex flex-col bg-(--toast-bg) p-2!">
            <h1 className="font-bold">{data?.message}</h1>
        </div>
    );
}

export default SuccessNotification;
