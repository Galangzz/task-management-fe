import type { ITask } from '../types/index.js';
import { api, ensureBase } from './api.js';

type addTaskProps = {
    title: string | null;
    detail: string;
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
    starred: boolean;
    isCompleted: boolean;
};

type updateTaskProps = {
    starred?: boolean | null;
    isCompleted?: boolean | null;
};

type updateTaskDetail = {
    title: string | null;
    detail: string | null;
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
    starred: boolean;
    isCompleted: boolean;
    taskTabId: string;
};

export async function addTask(
    taskTabId: string,
    {
        title,
        detail,
        deadline,
        hasDate,
        hasTime,
        starred,
        isCompleted,
    }: addTaskProps
) {
    ensureBase();
    const url = '/tasks';
    const resData = await api.post(url, {
        title,
        detail,
        deadline,
        hasDate,
        hasTime,
        starred,
        isCompleted,
        taskTabId,
    });

    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : null;
}

export async function updateTask(
    id: string,
    { starred = null, isCompleted = null }: updateTaskProps
) {
    ensureBase();
    const url = `/tasks/${id}`;
    await api.patch(url, {
        starred: starred,
        isCompleted: isCompleted,
    });
}

export async function getTaskById(
    id: string,
    signal?: AbortSignal
): Promise<ITask | null> {
    ensureBase();
    const url = `/tasks/${id}`;
    const res = await api.get(url, { signal: signal as AbortSignal });
    const resData = res?.data;
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : null;
}

export async function updateDetailTask(
    id: string,
    task: updateTaskDetail,
    signal?: AbortSignal
) {
    ensureBase();
    console.log('Updating...');
    const url = `/tasks/${id}`;
    await api.put(
        url,
        {
            title: task.title,
            detail: task.detail,
            deadline: task.deadline,
            hasDate: task.hasDate,
            hasTime: task.hasTime,
            starred: task.starred,
            isCompleted: task.isCompleted,
            taskTabId: task.taskTabId,
        },
        { signal: signal as AbortSignal }
    );
    console.log('Finish...');
    return true;
}

export async function getTasksByTabId(id: string, signal?: AbortSignal) {
    ensureBase();
    const url = `/tasks`;
    const res = await api.get(url, {
        params: {
            tabId: id,
        },
        signal: signal as AbortSignal,
    });
    const resData = res?.data;
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : resData;
}

export async function deleteTaskById(id: string) {
    ensureBase();
    const url = `/tasks/${id}`;
    await api.delete(url);
}
