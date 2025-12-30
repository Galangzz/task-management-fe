import { useEffect, useState } from 'react';
import { useTaskStore } from './useTaskStore.js';
import usePageLoadingState from './DefaultPageState/usePageLoadingState.js';
import useTabNavigation from './DefaultPageState/useTabNavigation.js';
import useTaskAction from './DefaultPageState/useTaskAction.js';
import useTaskTitleModal from './DefaultPageState/useTaskTitleModal.js';

function useDefaultPage() {
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const { task, tabs, setTabs } = useTaskStore();

    const { isLoadedPage, isLoadedTaskList, setIsLoadedTaskList } =
        usePageLoadingState(task, tabs);

    useTabNavigation(setIsLoadedTaskList);

    const titleModal = useTaskTitleModal();
    const action = useTaskAction();

    useEffect(() => {
        setTabs();
    }, [titleModal.submit]);

    return {
        tabs,
        task,
        isLoadedPage,
        isLoadedTaskList,
        isOpenModalTask,
        setIsOpenModalTask,
        ...titleModal,
        ...action,
    };
}

export default useDefaultPage;
