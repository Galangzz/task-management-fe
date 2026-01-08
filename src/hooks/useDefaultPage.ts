import { useEffect, useState } from 'react';
import { useTaskStore } from '../stores/useTaskStore.js';
import usePageLoadingState from './DefaultPageState/usePageLoadingState.js';
import useTabNavigation from './DefaultPageState/useTabNavigation.js';
import useTaskAction from './DefaultPageState/useTaskAction.js';
import useTaskTitleModal from './DefaultPageState/useTaskTitleModal.js';
import { useTabsStore } from '../stores/useTabStore.js';

function useDefaultPage(id: string | undefined) {
    console.log({ id });

    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const { tasks } = useTaskStore();
    const { tabs, tab, setTabs, currentTabId } = useTabsStore();

    const { isLoadedPage, isLoadedTaskList } =
        usePageLoadingState(tasks, tabs, id, currentTabId);

    const titleModal = useTaskTitleModal();
    const action = useTaskAction();

    useEffect(() => {
        let mounted = true;
        if (!mounted) return;
        if (!tabs) {
            setTabs();
        }
        return () => {
            mounted = false;
        };
    }, []);

    useTabNavigation(id);

    return {
        tabs,
        tab,
        tasks,
        isLoadedPage,
        isLoadedTaskList,
        isOpenModalTask,
        setIsOpenModalTask,
        ...titleModal,
        ...action,
    };
}

export default useDefaultPage;
