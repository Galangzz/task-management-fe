import { useEffect } from 'react';
import { updateDetailTask } from '../../services/tasksService.js';

type BuildPayloadProps = {
    title: string;
    detail: string | null;
    starred: boolean;
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
    isCompleted: boolean;
    taskTabId: string;
};

export function useUpdateTaskSubmit(
    buildPayload: () => BuildPayloadProps,
    id: string,
    initialize: boolean
) {
    const {
        title,
        detail,
        starred,
        deadline,
        hasDate,
        hasTime,
        isCompleted,
        taskTabId,
    } = buildPayload();

    useEffect(() => {
        let t: number;
        if (initialize) return;
        if (!title && !detail && !deadline) {
            //TODO Delete task
            alert('Delete task');
        } else {
            t = setTimeout(() => {
                updateDetailTask(id, {
                    title,
                    detail,
                    deadline,
                    hasDate,
                    hasTime,
                    starred,
                    isCompleted,
                    taskTabId,
                });
            }, 1000);
        }

        return () => {
            clearTimeout(t);
        };
    }, [title, detail, starred, deadline, hasDate, hasTime, taskTabId]);
}
