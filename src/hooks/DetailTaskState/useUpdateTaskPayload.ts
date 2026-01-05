import { useCallback } from 'react';

type FormProps = {
    title: string;
    detail: string | null;
    starred: boolean;
    isCompleted: boolean;
    taskTabId: string;
};

type DateTimeProps = {
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
};

export function useUpdateTaskPayload(task: FormProps, dateTime: DateTimeProps) {
    return useCallback(() => {
        return {
            title: task.title ? task.title.trim() : '',
            detail: task.detail ? task.detail.trim() : '',
            deadline:
                dateTime.hasDate && dateTime.deadline
                    ? new Date(dateTime.deadline)
                    : null,
            hasDate: dateTime.hasDate,
            hasTime: dateTime.hasTime,
            starred: task.starred,
            isCompleted: task.isCompleted,
            taskTabId: task.taskTabId,
        };
    }, [
        task.title,
        task.detail,
        task.starred,
        task.isCompleted,
        dateTime.hasDate,
        dateTime.hasTime,
        dateTime.deadline,
        task.taskTabId,
    ]);
}
