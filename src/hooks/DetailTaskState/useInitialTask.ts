import { useEffect, useState } from 'react';
import { getTaskById } from '../../services/tasksService.js';
import { getTabs } from '../../services/taskTabsService.js';
import type { ITab, ITask } from '../../types/index.js';
import { useNavigate } from 'react-router-dom';
import { useTabsStore } from '../../stores/useTabStore.js';
import { useTaskStore } from '../../stores/useTaskStore.js';
import ApiError from '../../errors/ApiError.js';

export function useInitialTask(taskId: string | undefined) {
    const { tabs, tab, setTabs, setTab } = useTabsStore();
    const { task, setTask, setTasks, loadTask } = useTaskStore();
    const [err, setErr] = useState<number>(0);

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
            } catch (error){
                // navigate('/', { replace: true });
                if (error instanceof ApiError) {
                    if (error.status == 404) {
                        navigate('/', { replace: true });
                        return;
                    }
                    if (error.status == 403) {
                        setErr(error.status);
                        return;
                    }
                }
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
        detailTaskError: err,
    };
}
