import { useInitialTask } from './DetailTaskState/useInitialTask.js';
import { useTaskDetailValue } from './DetailTaskState/useTaskDetailValue.js';

export function useDetailTask(taskId: string | undefined) {
    const { tab, task } = useInitialTask(taskId);
    const {
        title,
        detail,
        starred,
        deadline,
        hasDate,
        hasTime,
        isCompleted,
        taskTabId,
    } = useTaskDetailValue(tab, task);

    return {
        tab,
        task,
        title,
        detail,
        starred,
        deadline,
        hasDate,
        hasTime,
        isCompleted,
        taskTabId,
    };
}
