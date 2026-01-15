import { useEffect, useState } from 'react';
import type { ITabs, ITabWithTasks } from '../../types/index.js';

function usePageLoadingState(task: ITabWithTasks | null, tabs: ITabs[] | null) {
    const [isLoadedPage, setIsLoadedPage] = useState(true);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(true);

    useEffect(() => {
        let timer: number;
        if (task) {
            timer = setTimeout(() => {
                setIsLoadedPage(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [task, tabs]);

    useEffect(() => {
        let timer: number;
        if (task) {
            timer = setTimeout(() => {
                setIsLoadedTaskList(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [task]);

    return { isLoadedPage, isLoadedTaskList, setIsLoadedTaskList };
}

export default usePageLoadingState;
