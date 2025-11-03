import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import useTheme from '../hooks/useTheme';
import { ThemeProvider } from '../context/Theme';
import FormTitleList from '../components/FormTitleList';
import { useNavigate } from 'react-router-dom';
import { getAllTasks, getTaskListByTitle, postTask } from '../services/localService';
import { nanoid } from 'nanoid';

function DefaultPage() {
    const [tabs, setTabs] = useState([]);
    const [theme, toggleTheme] = useTheme();
    const [titleList, setTitleList] = useState('');
    const [toggleTitleForm, setToggleTitleForm] = useState(false);
    const [errTL, setErrTL] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setTabs(() => getAllTasks());
    }, []);

    // const currentId = location.pathname.split('/tab/')[1];

    const addTab = () => {
        setToggleTitleForm(() => true);
        // const newId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
        // setTabs([...tabs, { id: newId }]);
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
        setToggleTitleForm(false);
        navigate(`/${titleList}`);
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

                {toggleTitleForm && (
                    <FormTitleList
                        titleList={titleList}
                        setTitleList={setTitleList}
                        setToggleTitle={setToggleTitleForm}
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
