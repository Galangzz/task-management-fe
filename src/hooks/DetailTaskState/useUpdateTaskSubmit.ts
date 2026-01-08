import { useEffect, useRef } from 'react';
import { updateDetailTask } from '../../services/tasksService.js';
import { isTaskDirty } from '../../utils/taskHelper.js';
import type { ITasks } from '../../types/index.js';

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
    task: ITasks,
    setTask: (task: ITasks) => void,
    setTasks: (tasks: ITasks[]) => void,
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

    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        if (initialize) return;
        if (
            !isTaskDirty(
                {
                    title: task.title,
                    detail: task.detail,
                    starred: task.starred,
                    deadline: task.deadline,
                    hasDate: task.hasDate,
                    hasTime: task.hasTime,
                    isCompleted: task.isCompleted,
                    taskTabId: task.taskTabId,
                },
                {
                    title,
                    detail,
                    starred,
                    deadline,
                    hasDate,
                    hasTime,
                    isCompleted,
                    taskTabId,
                }
            )
        )
            return;

        if (!title && !detail && !deadline) {
            //TODO Delete task
            alert('Delete task');
        }

        const t = setTimeout(() => {
            abortRef.current?.abort();

            const controller = new AbortController();
            abortRef.current = controller;

            updateDetailTask(id, {
                title,
                detail,
                deadline,
                hasDate,
                hasTime,
                starred,
                isCompleted,
                taskTabId,
            }, controller.signal)
                .then((res) => {
                    if (res) {
                        setTask({
                            ...task,
                            title,
                            detail,
                            deadline,
                            hasDate,
                            hasTime,
                            starred,
                            isCompleted,
                            taskTabId,
                        });
                        setTasks([
                            {
                                ...task,
                                title,
                                detail,
                                deadline,
                                hasDate,
                                hasTime,
                                starred,
                                isCompleted,
                                taskTabId,
                            },
                        ]);
                    }
                })
                .catch((err) => console.log(err));
        }, 2000);

        return () => {
            clearTimeout(t);
            abortRef.current?.abort();
        };
    }, [title, detail, starred, deadline, hasDate, hasTime, taskTabId]);
}
