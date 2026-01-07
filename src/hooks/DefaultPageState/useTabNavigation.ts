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

    const { loadTask, setTaks } = useTaskStore();

    const { tabs, setTab, currentTabId, setCurrentTabId, pendingUpdates } =
        useTabsStore();

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

        const currentTab = id;
        console.log({ PreviousTab: previousTabRef.current, currentTab });

        if (previousTabRef.current === currentTab && !isInitialMount.current) {
            return;
        }

        const isFirstLoad = isInitialMount.current;
        isInitialMount.current = false;

        console.log(
            `Tab: ${previousTabRef.current} → ${currentTab} (firstLoad: ${isFirstLoad})`
        );
        console.log({ currentTab, currentTabId });
        if (isCancelled) return;

        const run = async () => {
            if (
                previousTabRef.current !== '' &&
                previousTabRef.current !== currentTab
            ) {
                setIsLoadedTaskList(true);
                // resetOnTabChange(currentTab);
                // if (currentTab === currentTabId) return;
                if (isCancelled) return;

                await loadTask(currentTab);
                console.log({ pendingUpdates });
                if (pendingUpdates.has(currentTab)) {
                    setTaks(pendingUpdates.get(currentTab)!);
                }
            } else {
                try {
                    // const data = await getTaskTabById(currentTab);
                    // console.log({ data });
                    if (isCancelled) return;

                    setCurrentTabId(currentTab);
                    await loadTask(currentTab);
                    console.log({ pendingUpdates });

                    if (pendingUpdates.has(currentTab)) {
                        setTaks(pendingUpdates.get(currentTab)!);
                    }
                } catch (error) {
                    if (error instanceof ApiError) {
                        if (error.status == 404) {
                            navigate('/', { replace: true });
                            return;
                        }
                    }
                }
            }

            previousTabRef.current = currentTab;
        };
        run();
        return () => {
            isCancelled = true;
        };
    }, [location.pathname, id]);

    return null;
}
export default useTabNavigation;
