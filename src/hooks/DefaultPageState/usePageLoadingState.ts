import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ITab, ITask } from '../../types/index.js';
import { el } from 'date-fns/locale';

function usePageLoadingState(
    task: ITask[] | null,
    tabs: ITab[] | null,
    tabId: string | undefined,
    currentTabId: string
) {
    const [isLoadedPage, setIsLoadedPage] = useState(false);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(false);
    const location = useLocation();

    console.log({ currentTabId });
    useEffect(() => {
        setIsLoadedPage(true);
        setIsLoadedTaskList(true);
        if (tabs) {
            setIsLoadedPage(false);
        }
        if (task) {
            if (tabId === currentTabId || tabId === 'starred-task') {
                setIsLoadedTaskList(false);
            }
        }
    }, [task, tabs, location.pathname, currentTabId]);

    return { isLoadedPage, isLoadedTaskList };
}

export default usePageLoadingState;
