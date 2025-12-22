import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/Toast.js';
import { useTaskStore } from './useTaskStore.js';
import {
    addTaskTabTitle,
    getTaskTabById,
} from '../services/taskTabsService.js';
import { updateTask } from '../services/tasksService.js';
import ApiError from '../errors/ApiError.js';

export function useDefaultPage() {
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const [isLoadingTitle, setIsLoadingTitle] = useState(false);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(true);
    const [isLoadedPage, setIsLoadedPage] = useState(true);
    const [errTitle, setErrTitle] = useState<Error | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const previousTabRef = useRef('');
    const isInitialMount = useRef(true);

    const { toast } = useContext(ToastContext);

    const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        optimisticToggleChecked,
        optimisticToggleStarred,
        refreshPendingTabs,
        error,
        clearError,
    } = useTaskStore();

    console.log({ task });

    useEffect(() => {
        if (error) {
            toast.error(error.message);
            clearError();
        }
    }, [error, toast, clearError]);

    useEffect(() => {
        setTabs();
    }, [setTabs]);

    // Handle tab navigation and loading
    useEffect(() => {
        let isCancelled = false;
        const currentTab = location.pathname.split('/')[1] || 'main-task';

        // Skip jika tab tidak berubah
        if (previousTabRef.current === currentTab && !isInitialMount.current) {
            return;
        }

        const isFirstLoad = isInitialMount.current;
        isInitialMount.current = false;

        console.log(
            `Tab: ${previousTabRef.current} → ${currentTab} (firstLoad: ${isFirstLoad})`
        );
        const run = async () => {
            // Deteksi perubahan tab
            if (
                previousTabRef.current !== '' &&
                previousTabRef.current !== currentTab
            ) {
                // Tab changed
                setIsLoadedTaskList(true);
                resetOnTabChange(currentTab);
            } else {
                // First load - langsung set tanpa reset
                try {
                    const data = await getTaskTabById(currentTab);
                    console.log({ data });
                    if (isCancelled) return;

                    setCurrentTabId(currentTab);
                    loadTaskList(currentTab);
                } catch (error: any) {
                    if (error.status == 404) {
                        navigate('/', { replace: true });
                        return;
                    }
                }
            }

            previousTabRef.current = currentTab;
        };
        run();
        return () => {
            isCancelled = true;
        };
    }, [
        location.pathname,
        loadTaskList,
        navigate,
        resetOnTabChange,
        setCurrentTabId,
    ]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (task) {
            timer = setTimeout(() => {
                setIsLoadedPage(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [task, tabs]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (task) {
            timer = setTimeout(() => {
                setIsLoadedTaskList(false);
            }, 500);
        }
        return () => clearTimeout(timer);
    }, [task]);

    // Handle toast completion - refresh pending tabs
    useEffect(() => {
        if (stackedToast === 0) {
            refreshPendingTabs();
        }
    }, [stackedToast, refreshPendingTabs]);

    const handleSubmitTitleList = useCallback(async () => {
        setIsLoadingTitle(true);
        try {
            const { id } = await addTaskTabTitle({ title: titleList });
            if (timeOutRef.current) clearTimeout(timeOutRef.current);
            timeOutRef.current = setTimeout(() => {
                setTabs();
                setErrTitle(null);
                setTitleList('');
                setIsLoadingTitle(false);
                setIsOpenModalTaskTitle(false);
                navigate(`/${id}`);
            }, 1000);
        } catch (err: any) {
            setErrTitle(err);
            if (err instanceof ApiError) {
                setIsLoadingTitle(false);
            } else {
                setIsLoadingTitle(false);
                setTitleList('');
            }
        }
    }, [navigate, titleList, setTabs]);

    useEffect(() => {
        return () => {
            if (timeOutRef.current) {
                clearTimeout(timeOutRef.current);
            }
        };
    }, []);

    const handleChecked = useCallback(
        async (id: string, isCompleted: boolean) => {
            console.log({ handleCheckId: id, currentTabId });

            increaseToast();
            
            setTimeout(async () => {
                optimisticToggleChecked(id);

                const message =
                    isCompleted === true
                        ? 'Tugas Selesai'
                        : 'Tugas ditandai belum selesai';

                toast.undo(
                    message,
                    () => {
                        // Undo callback - revert UI
                        console.log('Undo clicked');
                        undoLocalStatus(id);
                    },
                    () => {
                        // OnClose callback - commit to localStorage
                        console.log('Toast closed, committing to DB');
                        fixChecked(id, currentTabId, isCompleted);
                    },
                    () => {
                        // After close - decrease counter
                        console.log('Toast animation complete');
                        decreaseToast();
                    }
                );
            }, 300); // Reduced delay for better UX
        },
        [
            // task,
            currentTabId,
            toast,
            increaseToast,
            decreaseToast,
            optimisticToggleChecked,
            fixChecked,
            undoLocalStatus,
        ]
    );

    const handleStarred = useCallback(
        async (id: string, starred: boolean) => {
            await optimisticToggleStarred(id);
            await updateTask(id, { starred });
        },
        [optimisticToggleStarred]
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
        isLoadedPage,
        setIsLoadedTaskList,
        errTitle,
        setErrTitle,
        handleSubmitTitleList,
        handleChecked,
        handleStarred,
    };
}
