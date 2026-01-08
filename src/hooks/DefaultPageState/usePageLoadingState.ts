import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ITabs, ITasks } from '../../types/index.js';
import { el } from 'date-fns/locale';

function usePageLoadingState(
    task: ITasks[] | null,
    tabs: ITabs[] | null,
    tabId: string | undefined,
    currentTabId: string
) {
    const [isLoadedPage, setIsLoadedPage] = useState(false);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(false);
    const location = useLocation();

    console.log({currentTabId})
    useEffect(() => {
        setIsLoadedPage(true);
        setIsLoadedTaskList(true);
        if (tabs) {
            setIsLoadedPage(false);
        }
        if (task) {
            if (tabId === currentTabId) {
                setIsLoadedTaskList(false);
            }
        }
    }, [task, tabs, location.pathname, currentTabId]);

    return { isLoadedPage, isLoadedTaskList, setIsLoadedTaskList };
}

export default usePageLoadingState;
