import { useState } from 'react';
import { useInitialTask } from './DetailTaskState/useInitialTask.js';
import { useTaskDetailValue } from './DetailTaskState/useTaskDetailValue.js';
import { useUpdateTaskPayload } from './DetailTaskState/useUpdateTaskPayload.js';
import { useUpdateTaskSubmit } from './DetailTaskState/useUpdateTaskSubmit.js';
import useTaskDateTime from './useTaskDateTime.js';
import { useHandleBackDetail } from './DetailTaskState/useHandleBackDetail.js';

export function useDetailTask(taskId: string | undefined) {
    const [isOpenModalTab, setIsOpenModalTab] = useState(false);
    const { tabs, tab, task, setTask, setTasks, detailTaskError } =
        useInitialTask(taskId);
    const [initialize, setInitialize] = useState(true);

    const { title, detail, starred, isCompleted, taskTabId } =
        useTaskDetailValue(tabs, task, setInitialize);

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
            taskTabId: taskTabId.value as string,
        },
        {
            deadline: dateTime.deadline.value,
            hasDate: dateTime.hasDate,
            hasTime: dateTime.hasTime,
        }
    );

    const { isDirty } = useUpdateTaskSubmit(
        buildPayload,
        task!,
        setTask,
        setTasks,
        taskId as string,
        initialize
    );

    const { handleBackDetail } = useHandleBackDetail(isDirty);

    return {
        tabs,
        tab,
        task,
        detailTaskError,
        title,
        detail,
        starred,
        isCompleted,
        taskTabId,
        dateTime,
        modalTab: {
            isOpen: isOpenModalTab,
            open: () => setIsOpenModalTab(true),
            close: () => setIsOpenModalTab(false),
        },
        handleBackDetail,
        isDirty,
    };
}
