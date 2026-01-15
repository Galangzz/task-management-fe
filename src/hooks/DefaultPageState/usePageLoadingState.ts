import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { ITab, ITask } from '../../types/index.js';

function usePageLoadingState(
    task: ITask[] | null,
) {
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!task || (task && task?.length === 0)) {
            setIsLoadedTaskList(true);
        }
    }, [location.pathname, task]);

    useEffect(() => {
        if (!task) return;

        const t = setTimeout(() => {
            setIsLoadedTaskList(false);
        }, 100);

        return () => {
            clearTimeout(t);
        };
    }, [location.pathname, task]);

    return { isLoadedTaskList };
}

export default usePageLoadingState;
