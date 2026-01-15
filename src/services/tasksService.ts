import { api, ensureBase } from './api.js';

type addTaskProps = {
    title: string;
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
    );

    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data.message
        : null;
}

export async function updateTask(
    id: string,
    { starred = null, isCompleted = null }: updateTaskProps
) {
    ensureBase();
    const url = `/tasks/${id}`;
    await api.patch(
        url,
        {
            starred: starred,
            isCompleted: isCompleted,
        },

    );
}
