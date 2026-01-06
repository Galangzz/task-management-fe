import { useEffect, useState } from 'react';
import { getTaskById } from '../../services/tasksService.js';
import { getTaskTabs } from '../../services/taskTabsService.js';
import type { ITabs, ITasks } from '../../types/index.js';
import { useNavigate } from 'react-router-dom';

export function useInitialTask(taskId: string | undefined) {
    const [tab, setTab] = useState<ITabs[] | null>(null);
    const [task, setTask] = useState<ITasks | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const getTask = async () => {
            try {
                const resTab = await getTaskTabs();
                const resTask = await getTaskById(taskId as string);

                if (isMounted) {
                    setTab(resTab);
                    setTask(resTask);
                }
            } catch {
                navigate('/', { replace: true });
                return;
            }
        };

        if (isMounted && taskId) {
            getTask();
        }
        return () => {
            isMounted = false;
        };
    }, [taskId]);

    return {
        tab,
        task,
        setTask,
    };
}
