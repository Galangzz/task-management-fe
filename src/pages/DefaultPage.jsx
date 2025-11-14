import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import ModalTaskTitle from '../components/specific/ModalTaskTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllTasks, getTaskListById, getTaskListByTitle, postTask } from '../services/localService';
import { nanoid } from 'nanoid';
import TaskContent from '../components/layout/TaskContent';
import AddButton from '../components/ui/AddButton';
import ModalNewTask from '../components/specific/ModalNewTask';

function DefaultPage() {
    const [tabs, setTabs] = useState([]);
    const [task, setTask] = useState({});
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
    const [isOpenModalTask, setIsOpenModalTask] = useState(false);
    const [errTL, setErrTL] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setTabs(() => getAllTasks());
        if (!isOpenModalTaskTitle) {
            setErrTL('');
            setTitleList('');
        }
    }, [isOpenModalTaskTitle]);

   

    useEffect(() => {
        const currentTab = location.pathname.split('/')[1];
        const newTaskList = getTaskListById(currentTab);
        console.log({newTaskList, currentTab})
        setTask(newTaskList);
        console.log('New Task List: ', newTaskList);
        if (!newTaskList && currentTab) {
            setTask(getTaskListById(''));

            navigate('/', { replace: true });

            return;
        }

        if (newTaskList && newTaskList.id === 'main-task' && currentTab !== 'main-task') {
            navigate('/');
        } else if (currentTab && currentTab !== newTaskList.id) {
            navigate(`/${currentTab}`);
        }
    }, [navigate, location.pathname, isOpenModalTask]);

    const addTab = () => {
        setIsOpenModalTaskTitle(() => true);
    };

    const addTask = () => {
        setIsOpenModalTask(() => true);
    };

    const handleSubmitTitleList = () => {
        const checkTitle = getTaskListByTitle(titleList);

        if (checkTitle) {
            setErrTL('Judul Task List tidak boleh duplikat');
            return;
        }
        const id = nanoid(16);
        const post = postTask({ id: id, title: titleList });
        if (!post) {
            setErrTL('Gagal Menambahkan Task List');
            return;
        }

        setErrTL('');
        setIsOpenModalTaskTitle(false);
        navigate(`/${id}`);
        setTitleList('');
        console.log(tabs);
    };

    return (
        <div className="relative w-screen h-screen flex flex-col">
            <Header />
            <Navbar
                tabs={tabs}
                addList={addTab}
            />

            {isOpenModalTaskTitle && (
                <ModalTaskTitle
                    titleList={titleList}
                    setTitleList={setTitleList}
                    setToggleTitle={setIsOpenModalTaskTitle}
                    handleSubmitTitleList={handleSubmitTitleList}
                    err={errTL}
                    setErr={setErrTL}
                />
            )}

            {isOpenModalTask && <ModalNewTask setIsOpenModalTask={setIsOpenModalTask} />}

            <TaskContent task={task ?? {}} />

            <AddButton onClick={addTask} />
        </div>
    );
}

export default DefaultPage;
