import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../../stores/useTaskStore.js';
import { getTaskTabById } from '../../services/taskTabsService.js';
import ApiError from '../../errors/ApiError.js';
import { useTabsStore } from '../../stores/useTabStore.js';

function useTabNavigation(
    setIsLoadedTaskList: (value: React.SetStateAction<boolean>) => void,
    id: string | undefined
) {
    const navigate = useNavigate();
    const location = useLocation();
    const previousTabRef = useRef('');
    const isInitialMount = useRef(true);

    const { tasks, loadTask, setTasks } = useTaskStore();

    const {
        tabs,
        setTab,
        setTabs,
        currentTabId,
        setCurrentTabId,
        pendingUpdates,
    } = useTabsStore();

    useEffect(() => {
        let isCancelled = false;
        if (id === undefined) {
            const tabId = tabs
                ?.map((t) => (t.deletePermission == false ? t.id : null))
                .filter((t) => t !== null)[0];
            navigate(`/${tabId}`, { replace: true });
            return;
        }
        setTab(id);

        const controller = new AbortController();
        const signal = controller.signal;

        const run = async () => {
            try {
                console.log({ currentTabId });
                if (!tabs) {
                    await setTabs();
                }

                if (!tasks) {
                    await loadTask(id, signal);
                }

                if (tasks && tasks[0]?.taskTabId !== id) {
                    await loadTask(id, signal);
                }

                console.log({ pendingUpdates });
                if (pendingUpdates.has(id)) {
                    setTasks(pendingUpdates.get(id)!);
                }
                setCurrentTabId(id);
                console.log({ currentTabId });
            } catch (error) {
                if (error instanceof ApiError) {
                    if (error.status == 404) {
                        navigate('/', { replace: true });
                        return;
                    }
                }
            }
        };
        run();
        return () => {
            controller.abort();
        };
    }, [location.pathname, id]);

    return null;
}
export default useTabNavigation;
