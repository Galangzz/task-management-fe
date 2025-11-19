import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import ModalTaskTitle from '../components/specific/ModalTaskTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { addTaskTitle, getAllTasks, getTaskListById } from '../services/localService';
import TaskContent from '../components/layout/TaskContent';
import AddButton from '../components/ui/AddButton';
import ModalNewTask from '../components/specific/ModalNewTask';
import Dropdown from '../components/ui/Dropdown';

function DefaultPage() {
    const [tabs, setTabs] = useState(() => getAllTasks() || []);
    const [task, setTask] = useState({});
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const [isLoadingTitle, setIsLoadingTitle] = useState(false);
    const [isLoadedTaskList, setIsLoadedTaskList] = useState(false);
    const [errTL, setErrTL] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsLoadedTaskList(true);
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
        console.log('aaaaaaaaaaaaaaa');
        setIsLoadingTitle(true);
        const { id, err } = await addTaskTitle({ title: titleList });
        if (err) {
            setErrTL(err);
            return;
        }

        setTabs(getAllTasks());

        setErrTL('');
        setIsOpenModalTaskTitle(false);
        setTitleList('');

        setIsLoadingTitle(false);
        navigate(`/${id}`);
    }, [navigate, titleList]);

    return (
        <div className="relative w-screen min-h-screen flex flex-col">
            <Header />
            <Navbar
                tabs={tabs}
                addList={() => setIsOpenModalTaskTitle(true)}
            />

            {isOpenModalTaskTitle && (
                <ModalTaskTitle
                    titleList={titleList}
                    setTitleList={setTitleList}
                    setToggleTitle={() => {
                        setIsOpenModalTaskTitle(false);
                        setErrTL('');
                        setTitleList('');
                    }}
                    handleSubmitTitleList={handleSubmitTitleList}
                    err={errTL}
                    setErr={setErrTL}
                />
            )}

            {isOpenModalTask && <ModalNewTask setIsOpenModalTask={setIsOpenModalTask}  />}

            <TaskContent
                task={task ?? {}}
                isLoading={isLoadedTaskList}
            />

            <AddButton onClick={() => setIsOpenModalTask(true)} />

            {isLoadingTitle && <p>aaaaa</p>}
            
        </div>
    );
}

export default DefaultPage;
