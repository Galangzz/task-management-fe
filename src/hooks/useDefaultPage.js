import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTaskTitle, getAllTasks, getTaskListById } from '../services/localService';

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

    useEffect(() => {
        setTabs(() => getAllTasks());
    }, []);

    useEffect(() => {
        const currentTab = location.pathname.split('/')[1] || 'main-task';

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
        }, 1000)
    }, [navigate, titleList]);

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
        handleSubmitTitleList
    };
}
