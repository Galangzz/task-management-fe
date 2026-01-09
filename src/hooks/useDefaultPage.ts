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
    const { tabs, tab, currentTabId } = useTabsStore();

    const {  isLoadedTaskList } = usePageLoadingState(
        tasks,
        tabs,
        id,
        currentTabId
    );

    const titleModal = useTaskTitleModal();
    const action = useTaskAction();

    useTabNavigation(id);

    return {
        tabs,
        tab,
        tasks,
        isLoadedTaskList,
        isOpenModalTask,
        setIsOpenModalTask,
        ...titleModal,
        ...action,
    };
}

export default useDefaultPage;
