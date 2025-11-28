import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTaskTitle, getAllTasks, getTaskListById, toggleStatusTask } from '../services/localService';

export function useDefaultPage() {
    const [tabs, setTabs] = useState([]);
    const [task, setTask] = useState({});
    const [taskActive, setTaskActive] = useState([]);
    const [taskComplete, setTaskComplete] = useState([]);
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const [isLoadingTitle, setIsLoadingTitle] = useState(false);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(true);
    const [errTitle, setErrTitle] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const [tempTask, setTempTask] = useState({});
    const [pathId, setPathId] = useState('')

    useEffect(() => {
        setTabs(() => getAllTasks());
    }, []);

    useEffect(() => {
        const currentTab = location.pathname.split('/')[1] || 'main-task';
        setPathId(currentTab)

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

    useEffect(() => {
        const filterActiveTask = () => {
            const tasks = task.tasks;
            const activeTask = tasks?.filter((t) => t.status == false) ?? [];
            return activeTask;
        };

        const filterCompleteTask = () => {
            const tasks = task.tasks;
            const completeTask = tasks?.filter((t) => t.status == true) ?? [];
            return completeTask;
        };
        setTaskActive(() => filterActiveTask());
        setTaskComplete(() => filterCompleteTask());
    }, [task]);

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

    const handleChecked = useCallback(
        (id) => {
            console.log({handleCheckId: id})
            const temp = task?.tasks?.find((t) => t?.id === id);
            const newStatus = !temp.status
            setTempTask(temp);
            setTimeout(() => {

                if (newStatus) {
                    setTaskActive(prev => prev.filter(t => t.id !== id));
                    setTaskComplete(prev => [...prev, { ...temp, status: true }]);
                } else {
                    setTaskComplete(prev => prev.filter(t => t.id !== id));
                    setTaskActive(prev => [...prev, { ...temp, status: false }]);
                }
                
                toggleStatusTask(id);
                setTask(() => getTaskListById(pathId))
                console.log({task})
            }, 1000);
        },
        [task, pathId]
    );

    // useEffect(() => {
    //     const getTask  = setTimeout(() => {
    //             setTask(() =>  getTaskListById(task?.id))
    //             console.log()
    //         }, 2000);

    //         return () => clearInterval(getTask)
    // }, [task]);

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
        taskActive,
        taskComplete,
        handleChecked,
    };
}
