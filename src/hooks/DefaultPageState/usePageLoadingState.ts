import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ITab, ITask } from '../../types/index.js';

function usePageLoadingState(
    task: ITask[] | null,
    tabs: ITab[] | null,
    tabId: string | undefined,
    currentTabId: string
) {
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(false);
    const location = useLocation();

    console.log({ currentTabId });
    useEffect(() => {
        setIsLoadedTaskList(true);
        let t: number;
        if (task) {
            if (tabId === currentTabId || tabId === 'starred-task') {
                t = setTimeout(() => {
                    setIsLoadedTaskList(false);
                }, 100);
            }
        }
        return () => {
            clearTimeout(t);
        };
    }, [task, tabs, location.pathname, currentTabId]);

    return { isLoadedTaskList };
}

export default usePageLoadingState;
