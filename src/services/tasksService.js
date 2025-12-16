import { api, ensureBase } from './api';

export async function addTask(
    taskTabId,
    { title, detail, deadline, hasDate, hasTime, starred, isCompleted }
) {
    ensureBase();
    const url = '/tasks';
    await api.post(
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
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: false,
        }
    );
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
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: false,
        }
    );
}
