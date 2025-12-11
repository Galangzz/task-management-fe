import { api, ensureBase } from './api';

export async function addTask(taskTabId, { title, detail, deadline, hasDate, hasTime, starred, isCompleted }) {
    ensureBase();
    const url = '/tasks';
    await api.post(
        url,
        { title, detail, deadline, hasDate, hasTime, starred, isCompleted, taskTabId },
        {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: false,
        }
    );
}
