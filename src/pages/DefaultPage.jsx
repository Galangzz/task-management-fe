import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import useTheme from '../hooks/useTheme';
import { ThemeProvider } from '../context/Theme';
import FormTitleList from '../components/ModalTaskTitle';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, getTaskListById, getTaskListByTitle, postTask } from '../services/localService';
import { nanoid } from 'nanoid';

function DefaultPage() {
    const [tabs, setTabs] = useState([]);
    const [theme, toggleTheme] = useTheme();
    const [titleList, setTitleList] = useState('');
    const [isOpenModalTaskTitle, setIsOpenModalTaskTitle] = useState(false);
    const [errTL, setErrTL] = useState('');
    const navigate = useNavigate();

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
        } else if (currentTab == 'stared-task') {
            navigate(`/${currentTab}`);
        } else {
            const activeTask = getTaskListById(currentTab);
            if (!activeTask) {
                navigate('/');
            } else {
                navigate(`/${currentTab}`);
            }
        }
        console.log(currentTab);
    }, [navigate]);

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
        <ThemeProvider value={{ theme, toggleTheme }}>
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
            </div>
        </ThemeProvider>
    );
}

export default DefaultPage;
