import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {  getTaskListById } from '../services/localService';
import { ToastContext } from '../context/Toast';
import { useTaskStore } from './useTaskStore';
import { addTaskTabTitle } from '../services/taskTabsService';

export function useDefaultPage() {
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const [isLoadingTitle, setIsLoadingTitle] = useState(false);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(true);
    const [errTitle, setErrTitle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const previousTabRef = useRef('');
    const isInitialMount = useRef(true);

    const { toast } = useContext(ToastContext);

    const {
        tabs,
        task,
        currentTabId,
        stackedToast,
        setTabs,
        setCurrentTabId,
        loadTaskList,
        resetOnTabChange,
        increaseToast,
        decreaseToast,
        fixChecked,
        undoLocalStatus,
        optimisticToggle,
        refreshPendingTabs,
    } = useTaskStore();

    console.log({task})
    // Initial load tabs
    useEffect(() => {
        setTabs();
    }, [setTabs]);

    // Handle tab navigation and loading
    useEffect(() => {
        const currentTab = location.pathname.split('/')[1] || 'main-task';

        // Skip jika tab tidak berubah
        if (previousTabRef.current === currentTab && !isInitialMount.current) {
            return;
        }

        const isFirstLoad = isInitialMount.current;
        isInitialMount.current = false;

        console.log(`Tab: ${previousTabRef.current} → ${currentTab} (firstLoad: ${isFirstLoad})`);

        // Deteksi perubahan tab
        if (previousTabRef.current !== '' && previousTabRef.current !== currentTab) {
            // Tab changed
            resetOnTabChange(currentTab);
        } else {
            // First load - langsung set tanpa reset
            const data = getTaskListById(currentTab);
            if (data) {
                setCurrentTabId(currentTab);
                loadTaskList(currentTab);
            } else {
                navigate('/main-task', { replace: true });
                return;
            }
        }

        previousTabRef.current = currentTab;
        setTimeout(() => {
            
            setIsLoadedTaskList(false);
        }, 1000);
    }, [location.pathname, loadTaskList, navigate, resetOnTabChange, setCurrentTabId]);

    // Handle toast completion - refresh pending tabs
    useEffect(() => {
        if (stackedToast === 0) {
            refreshPendingTabs();
        }
    }, [stackedToast, refreshPendingTabs]);

    const handleSubmitTitleList = useCallback(async () => {
        setIsLoadingTitle(true);
        const { id, err } = await addTaskTabTitle({ title: titleList });
        if (err) {
            setErrTitle(err);
            setIsLoadingTitle(false);
            return;
        }

        setTimeout(() => {
            setTabs();
            setErrTitle('');
            setIsOpenModalTaskTitle(false);
            setTitleList('');
            setIsLoadingTitle(false);
            navigate(`/${id}`);
        }, 1000);
    }, [navigate, titleList, setTabs]);

    const handleChecked = useCallback(
        async (id) => {
            console.log({ handleCheckId: id, currentTabId });

            increaseToast();

            setTimeout(async () => {
                // Optimistic update - UI berubah langsung
                optimisticToggle(id);

                const target = task.tasks.find((t) => t.id === id);
                const message = target?.status === false ? 'Tugas Selesai' : 'Tugas ditandai belum selesai';

                toast.undo(
                    message,
                    () => {
                        // Undo callback - revert UI
                        console.log('Undo clicked');
                        undoLocalStatus(id);
                    },
                    () => {
                        // OnClose callback - commit to localStorage
                        console.log('Toast closed, committing to localStorage');
                        fixChecked(id, currentTabId);
                    },
                    () => {
                        // After close - decrease counter
                        console.log('Toast animation complete');
                        decreaseToast();
                    }
                );
            }, 300); // Reduced delay for better UX
        },
        [task, currentTabId, toast, increaseToast, decreaseToast, optimisticToggle, fixChecked, undoLocalStatus]
    );

    return {
        tabs,
        task,
        titleList,
        setTitleList,
        isOpenModalTaskTitle,
        setIsOpenModalTaskTitle,
        isOpenModalTask,
        setIsOpenModalTask,
        isLoadingTitle,
        setIsLoadingTitle,
        isLoadedTaskList,
        setIsLoadedTaskList,
        errTitle,
        setErrTitle,
        handleSubmitTitleList,
        handleChecked,
    };
}
