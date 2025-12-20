import { api, ensureBase } from './api';

export async function addTask(
    taskTabId,
    { title, detail, deadline, hasDate, hasTime, starred, isCompleted }
) {
    ensureBase();
    const url = '/tasks';
    const resData = await api.post(
        url,
        {
            title,
            detail,
            deadline,
            hasDate,
            hasTime,
            starred,
            isCompleted,
            taskTabId,
        },
        {
            withCredentials: false,
        }
    );

    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data.message
        : null;
}

export async function updateTask(id, { starred = null, isCompleted = null }) {
    ensureBase();
    const url = `/tasks/${id}`;
    await api.patch(
        url,
        {
            starred: starred,
            isCompleted: isCompleted,
        },
        {
            withCredentials: false,
        }
    );
}
