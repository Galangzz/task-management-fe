import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../../stores/useTaskStore.js';
import { getTaskTabById } from '../../services/taskTabsService.js';
import ApiError from '../../errors/ApiError.js';
import { useTabsStore } from '../../stores/useTabStore.js';

function useTabNavigation(id: string | undefined) {
    const navigate = useNavigate();
    const location = useLocation();

    const { tasks, loadTask, setTasks, refreshTasks } = useTaskStore();

    const {
        tabs,
        setTab,
        setTabs,
        currentTabId,
        setCurrentTabId,
        pendingUpdates,
    } = useTabsStore();

    useEffect(() => {
        if (id === undefined) {
            const tabId = tabs
                ?.map((t) => (t.deletePermission == false ? t.id : null))
                .filter((t) => t !== null)[0];
            navigate(`/${tabId}`, { replace: true });
            return;
        }
        setTab(id);
        if (currentTabId !== id) {
            refreshTasks();
        }
        if (id !== 'starred-task') {
            setCurrentTabId(id);
        }

        const controller = new AbortController();
        const signal = controller.signal;

        const run = async () => {
            try {
                console.log({ currentTabId });
                console.log({ tasks });

                if (
                    !tasks ||
                    (tasks && tasks?.length === 0) ||
                    (tasks &&
                        tasks?.length > 0 &&
                        tasks?.some((t) => t.taskTabId !== id))
                ) {
                    await loadTask(id, signal);
                }

                console.log({ pendingUpdates });
                if (pendingUpdates.has(id)) {
                    console.log({ TabId: id, pendingUpdates });
                    setTasks(pendingUpdates.get(id)!);
                }

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
