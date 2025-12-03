import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTaskTitle, getAllTasks, getTaskListById, toggleStatusTask } from '../services/localService';
import { ToastContext } from '../context/Toast';

export function useDefaultPage() {
    const [tabs, setTabs] = useState([]);
    const [task, setTask] = useState({});
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const [isLoadingTitle, setIsLoadingTitle] = useState(false);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(true);
    const [errTitle, setErrTitle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { toast } = useContext(ToastContext);
    const [stackedToast, setStackedToast] = useState(0);
    const [pathId, setPathId] = useState('');
    const pendingTasksRef = useRef(new Map());
    const stackedRef = useRef(0);
    console.log({ stackedToast });

    useEffect(() => {
        setTabs(() => getAllTasks());
    }, []);

    useEffect(() => {
        const currentTab = location.pathname.split('/')[1] || 'main-task';
        setPathId(currentTab);

        const newTaskList = getTaskListById(currentTab);

        console.log({ newTaskList, currentTab });

        setTask(newTaskList);

        setIsLoadedTaskList(false);

        console.log('New Task List: ', newTaskList);
        if (!newTaskList) {
            navigate('/', { replace: true });
            setTask(getTaskListById('main-task'));
            setIsLoadedTaskList(false);

            return;
        }

        if (newTaskList.id === 'main-task' && currentTab !== 'main-task') {
            navigate('/');
        } else {
            navigate(`/${currentTab}`);
        }
        return;
    }, [navigate, location.pathname, isOpenModalTask]);

    const handleSubmitTitleList = useCallback(async () => {
        setIsLoadingTitle(true);
        const { id, err } = await addTaskTitle({ title: titleList });
        if (err) {
            setErrTitle(err);
            return;
        }

        setTimeout(() => {
            setTabs(getAllTasks());

            setErrTitle('');
            setIsOpenModalTaskTitle(false);
            setTitleList('');

            setIsLoadingTitle(false);
            navigate(`/${id}`);
        }, 1000);
    }, [navigate, titleList]);

    useEffect(() => {
        stackedRef.current = stackedToast;
    }, [stackedToast, pathId]);

    // Effect untuk cleanup saat berpindah tab
    useEffect(() => {
        // Reset stacked toast saat pindah tab jika ada toast aktif
        if (stackedToast > 0) {
            console.log('Tab changed with active toasts, resetting...');
            setStackedToast(0);
            pendingTasksRef.current.clear();
        }
    }, [pathId, stackedToast]);

    // Effect untuk trigger refresh task ketika stackedToast menjadi 0
    useEffect(() => {
        if (stackedToast === 0 && pathId && pendingTasksRef.current.size > 0) {
            console.log('REFRESH TASK - stackedToast === 0');
            // Refresh semua tab yang memiliki pending tasks
            pendingTasksRef.current.forEach((_, tabId) => {
                if (tabId === pathId) {
                    setTask(getTaskListById(pathId));
                }
            });
            pendingTasksRef.current.clear();
        }
    }, [stackedToast, pathId]);

    const fixChecked = useCallback(async (id, taskPathId) => {
        await toggleStatusTask(id);
        console.log({ FixCheckedStacked: stackedRef.current, taskPathId });

        // Tandai bahwa tab ini memiliki pending update
        if (!pendingTasksRef.current.has(taskPathId)) {
            pendingTasksRef.current.set(taskPathId, 1);
        } else {
            pendingTasksRef.current.set(taskPathId, pendingTasksRef.current.get(taskPathId) + 1);
        }
    }, []);

    const undoChecked = useCallback((id) => {
        setTask((prev) => ({
            ...prev,
            tasks: prev.tasks.map((t) => (t.id === id ? { ...t, status: !t.status } : t)),
        }));
    }, []);

    const handleChecked = useCallback(
        async (id) => {
            console.log({ handleCheckId: id });
            const currentPathId = pathId;
            setStackedToast((prev) => prev + 1);
            setTimeout(async () => {
                const updated = {
                    ...task,
                    tasks: task.tasks.map((t) => (t.id === id ? { ...t, status: !t.status } : t)),
                };
                const target = task.tasks.find((t) => t.id === id);

                const message = target?.status === false ? 'Tugas Selesai' : 'Tugas ditandai belum selesai';
                setTask(updated);

                toast.undo(
                    message,
                    () => undoChecked(id),
                    () => fixChecked(id, currentPathId),
                    () => setStackedToast((prev) => Math.max(prev - 1, 0))
                );

                console.log({ task });
            }, 500);
        },
        [task, toast, fixChecked, undoChecked, pathId]
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
