import React from 'react';
import Field from '../Field.js';

function LoadingTaskList() {
    return (
        <div className="flex h-auto w-full flex-col items-center justify-center gap-8 p-8! [&_.div-load-task-list]:bg-(--background-header) [&_.div-load-task-list]:brightness-150 [&_.field-loading]:animate-pulse [&_.field-loading]:duration-500!">
            <Field className={'field-loading flex h-14 flex-col gap-4'}>
                <div className="div-load-task-list h-6 w-full max-w-60 rounded-2xl"></div>
                <div className="div-load-task-list h-6 w-full max-w-40 rounded-2xl"></div>
                <div className="my-6! flex flex-col gap-6">
                    <div className="div-load-task-list h-12 w-full rounded-4xl"></div>
                    <div className="div-load-task-list h-12 w-full rounded-4xl"></div>
                    <div className="div-load-task-list h-12 w-full rounded-4xl"></div>
                    <div className="div-load-task-list h-12 w-full rounded-4xl"></div>
                </div>
            </Field>
            <Field className={'field-loading h-14'}>
                <div className="flex h-8 gap-4">
                    <div className="div-load-task-list h-full w-8 rounded-full"></div>
                    <div className="div-load-task-list h-full w-full max-w-24 rounded-3xl"></div>
                </div>
            </Field>
        </div>
    );
}

export default LoadingTaskList;
