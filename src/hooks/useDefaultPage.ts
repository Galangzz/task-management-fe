import { useEffect, useState } from 'react';
import { useTaskStore } from './useTaskStore.js';
import usePageLoadingState from './DefaultPageState/usePageLoadingState.js';
import useTabNavigation from './DefaultPageState/useTabNavigation.js';
import useTaskAction from './DefaultPageState/useTaskAction.js';
import useTaskTitleModal from './DefaultPageState/useTaskTitleModal.js';

function useDefaultPage(id: string | undefined) {
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const { task, tabs, setTabs } = useTaskStore();

    const { isLoadedPage, isLoadedTaskList, setIsLoadedTaskList } =
        usePageLoadingState(task, tabs);

    const titleModal = useTaskTitleModal();
    const action = useTaskAction();

    useEffect(() => {
        setTabs();
    }, [titleModal.submit]);

    useTabNavigation(setIsLoadedTaskList, id);

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
