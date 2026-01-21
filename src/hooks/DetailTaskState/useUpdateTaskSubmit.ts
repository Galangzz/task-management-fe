import { useCallback, useEffect, useRef } from 'react';
import { updateDetailTask } from '../../services/tasksService.js';
import { isTaskDirty } from '../../utils/taskHelper.js';
import type { ITask } from '../../types/index.js';
import { useTabsStore } from '../../stores/useTabStore.js';
import { useTaskStore } from '../../stores/useTaskStore.js';

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
    task: ITask,
    setTask: (task: ITask) => void,
    setTasks: (tasks: ITask[]) => void,
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
    console.log({ taskTabId });

    const { currentTabId } = useTabsStore();
    const { optimisticDeleteTasks } = useTaskStore();
    const abortRef = useRef<AbortController | null>(null);

    const isDirty = useCallback(() => {
        return isTaskDirty(
            {
                title: task.title,
                detail: task.detail ?? '',
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
        );
    }, [
        task,
        title,
        detail,
        starred,
        deadline,
        hasDate,
        hasTime,
        isCompleted,
        taskTabId,
    ]);

    useEffect(() => {
        if (initialize || !task) return;
        if (!isDirty()) return;

        const t = setTimeout(() => {
            abortRef.current?.abort();

            const controller = new AbortController();
            abortRef.current = controller;

            updateDetailTask(
                id,
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
                controller.signal
            )
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
                        if (currentTabId === taskTabId || currentTabId === 'starred-task') {
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
                        } else {
                            optimisticDeleteTasks(id);
                        }
                    }
                })
                .catch((err) => console.log(err));
        }, 1000);

        return () => {
            clearTimeout(t);
            abortRef.current?.abort();
        };
    }, [title, detail, starred, deadline, hasDate, hasTime, taskTabId]);

    return { isDirty };
}
