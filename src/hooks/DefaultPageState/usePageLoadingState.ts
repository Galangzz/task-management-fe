import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ITab, ITask } from '../../types/index.js';

function usePageLoadingState(
    task: ITask[] | null,
    tabs: ITab[] | null,
    tabId: string | undefined,
    currentTabId: string
) {
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(false);
    const location = useLocation();
    const timeOutRef = useRef<number | null>(null);

    console.log({ currentTabId, tabId });
    useEffect(() => {
        if (!task || (task && task?.length === 0)) {
            setIsLoadedTaskList(true);
        }
        if (task && currentTabId === tabId) {
            
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
            
            timeOutRef.current = setTimeout(() => {
                setIsLoadedTaskList(false);
            }, 100);
        }
    }, [location.pathname, task]);

    return { isLoadedTaskList };
}

export default usePageLoadingState;
