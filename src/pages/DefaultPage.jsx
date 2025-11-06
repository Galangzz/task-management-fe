import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import FormTitleList from '../components/ModalTaskTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllTasks, getTaskListById, getTaskListByTitle, postTask } from '../services/localService';
import { nanoid } from 'nanoid';
import TaskContent from '../components/TaskContent';
import AddButton from '../components/AddButton';

function DefaultPage() {
    const [tabs, setTabs] = useState([]);
    const [task, setTask] = useState({});
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
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
        if (currentTab === '') {
            navigate('/');
        } else {
            navigate(`/${currentTab}`);
        }

        setTask(() => getTaskListById(currentTab));
        console.log(getTaskListById(currentTab));
        console.log(currentTab);
    }, [navigate, location.pathname]);

    const addTab = () => {
        setIsOpenModalTaskTitle(() => true);
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
                <FormTitleList
                    titleList={titleList}
                    setTitleList={setTitleList}
                    setToggleTitle={setIsOpenModalTaskTitle}
                    handleSubmitTitleList={handleSubmitTitleList}
                    err={errTL}
                    setErr={setErrTL}
                />
            )}

            <TaskContent task={task ?? {}} />

            <AddButton />
        </div>
    );
}

export default DefaultPage;
