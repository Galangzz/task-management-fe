import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../../stores/useTaskStore.js';
import { getTabById } from '../../services/taskTabsService.js';
import ApiError from '../../errors/ApiError.js';
import { useTabsStore } from '../../stores/useTabStore.js';

function useTabNavigation(id: string | undefined) {
    const navigate = useNavigate();

    const { tasks, loadTask, setTasks, refreshTasks } = useTaskStore();

    const {
        setTab,
        currentTabId,
        previousTabId,
        setCurrentTabId,
        setPreviousTabId,
        pendingUpdates,
    } = useTabsStore();

    const loadTaskList = async (
        tabId: string,
        signal?: AbortSignal,
        previous?: string
    ) => {
        try {
            await loadTask(tabId, signal);
            if (pendingUpdates.has(tabId)) {
                setTasks(pendingUpdates.get(tabId)!);
            }
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.status == 404) {
                    navigate(`/${previous}`, { replace: true });
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
        let mounted = true;

        if (!id || !mounted) return;

        if (!tasks || tasks?.length === 0 || currentTabId !== previousTabId) {
            console.log({ currentTabId, id, previousTabId });
            refreshTasks();

            loadTaskList(id as string, controller.signal, previousTabId).then(
                () => setPreviousTabId(currentTabId)
            );
        }

        return () => {
            controller.abort();
            mounted = false;
        };
    }, [id, currentTabId, previousTabId]);

    return null;
}
export default useTabNavigation;
