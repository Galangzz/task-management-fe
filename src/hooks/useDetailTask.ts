import { useState } from 'react';
import { useInitialTask } from './DetailTaskState/useInitialTask.js';
import { useTaskDetailValue } from './DetailTaskState/useTaskDetailValue.js';
import { useUpdateTaskPayload } from './DetailTaskState/useUpdateTaskPayload.js';
import { useUpdateTaskSubmit } from './DetailTaskState/useUpdateTaskSubmit.js';
import useTaskDateTime from './useTaskDateTime.js';

export function useDetailTask(taskId: string | undefined) {
    const { tab, task } = useInitialTask(taskId);
    const [initialize, setInitialize] = useState(true);

    const { title, detail, starred, isCompleted, taskTabId } =
        useTaskDetailValue(tab, task, setInitialize);

    const dateTime = useTaskDateTime({
        defaultDate: task?.deadline as Date | null,
        hasDate: task?.hasDate as boolean,
        hasTime: task?.hasTime as boolean,
    });

    const buildPayload = useUpdateTaskPayload(
        {
            title: title.value,
            detail: detail.value,
            starred: starred.value,
            isCompleted: isCompleted.value,
            taskTabId: task?.taskTabId as string,
        },
        {
            deadline: dateTime.deadline.value,
            hasDate: dateTime.hasDate,
            hasTime: dateTime.hasTime,
        }
    );

    useUpdateTaskSubmit(buildPayload, taskId as string, initialize);

    return {
        tab,
        task,
        title,
        detail,
        starred,
        isCompleted,
        taskTabId,
        dateTime,
    };
}
