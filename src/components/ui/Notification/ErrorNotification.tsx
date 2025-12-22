import React from 'react';

import { type ApiErrorType } from '../../../errors/ApiError.js';

interface ErrorNotificationProps {
    data: {
        error: ApiErrorType;
    };
}
function ErrorNotification({ data }: ErrorNotificationProps) {
    return (
        <div className="flex flex-col bg-(--toast-bg) p-2!">
            <h1 className="font-bold">{data?.error?.message}</h1>
            <p className="italic">{data?.error?.errors}</p>
        </div>
    );
}

export default ErrorNotification;
