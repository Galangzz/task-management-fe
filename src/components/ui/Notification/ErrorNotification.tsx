import React from 'react';

import ApiError, { type ApiErrorType } from '../../../errors/ApiError.js';

interface ErrorNotificationProps {
    data: {
        error: ApiErrorType | Error;
    };
}
function ErrorNotification({ data }: ErrorNotificationProps) {
    return (
        <div className="flex flex-col bg-(--toast-bg) p-2!">
            <h1 className="font-bold">{data?.error?.message}</h1>
            {data?.error instanceof ApiError && (
                <p className="italic">{data?.error?.errors}</p>
            )}
        </div>
    );
}

export default ErrorNotification;
