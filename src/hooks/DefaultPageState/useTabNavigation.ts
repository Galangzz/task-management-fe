import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../../stores/useTaskStore.js';
import { getTabById } from '../../services/taskTabsService.js';
import ApiError from '../../errors/ApiError.js';
import { useTabsStore } from '../../stores/useTabStore.js';

function useTabNavigation(id: string | undefined) {
    const navigate = useNavigate();
    const location = useLocation();

    const { tasks, loadTask, setTasks, refreshTasks } = useTaskStore();

    const { tabs, setTab, currentTabId, setCurrentTabId, pendingUpdates } =
        useTabsStore();

    const loadTaskList = async (tabId: string, signal?: AbortSignal) => {
        try {
            await loadTask(tabId, signal);
            if (pendingUpdates.has(tabId)) {
                console.log({ TabId: id, pendingUpdates });
                setTasks(pendingUpdates.get(tabId)!);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.status == 404) {
                    navigate(`/`, { replace: true });
                    return;
                }
            }
        }
    };

    useEffect(() => {
        if (id) {
            setCurrentTabId(id);
            setTab(id);
        }
    }, [id]);

    useEffect(() => {
        const controller = new AbortController();

        if (!id) return;

        if (!tasks || tasks.length === 0 || !tasks.every((t) => t.taskTabId === id)) {
            refreshTasks();
            loadTaskList(id as string, controller.signal);
        }

        return () => controller.abort();
    }, [currentTabId, id]);

    return null;
}
export default useTabNavigation;
