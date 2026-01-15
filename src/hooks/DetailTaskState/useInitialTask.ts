import { useEffect, useState } from 'react';
import { getTaskById } from '../../services/tasksService.js';
import { getTabs } from '../../services/taskTabsService.js';
import type { ITab, ITask } from '../../types/index.js';
import { useNavigate } from 'react-router-dom';
import { useTabsStore } from '../../stores/useTabStore.js';
import { useTaskStore } from '../../stores/useTaskStore.js';

export function useInitialTask(taskId: string | undefined) {
    // const [tab, setTab] = useState<ITab[] | null>(null);
    // const [task, setTask] = useState<ITask | null>(null);

    const { tabs, tab, setTabs, setTab } = useTabsStore();
    const { task, setTask, setTasks, loadTask } = useTaskStore();

    const navigate = useNavigate();

    useEffect(() => {
        if (!taskId) {
            navigate('/', { replace: true });
            return;
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const init = async () => {
            try {
                if (!tabs) {
                    await setTabs();
                }
                if (!task) {
                    const resTask = await getTaskById(taskId as string, signal);
                    if (!resTask) return;
                    setTab(resTask.taskTabId);

                    await loadTask(resTask.taskTabId);
                    setTask(resTask);
                }
            } catch {
                navigate('/', { replace: true });
                return;
            }
        };
        init();
        return () => {
            controller.abort();
        };
    }, [taskId]);

    return {
        tabs,
        tab,
        task,
        setTask,
        setTasks,
    };
}
