import React, {  useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import useTheme from '../hooks/useTheme';
import { ThemeProvider } from '../context/Theme';
import FormTitleList from '../components/FormTitleList';
import { useNavigate } from 'react-router-dom';

function DefaultPage() {
    const [tabs, setTabs] = useState([{ id: 1 }]);
    const [theme, toggleTheme] = useTheme();
    const [titleList, setTitleList] = useState('');
    const [toggleTitleForm, setToggleTitleForm] = useState(false);
    const navigate = useNavigate();

    // const currentId = location.pathname.split('/tab/')[1];


    const addTab = () => {
        setToggleTitleForm(() => true);
        const newId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
        setTabs([...tabs, { id: newId }]);
        navigate(`/tab/${newId}`);
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
                    />
                )}
            </div>
        </ThemeProvider>
    );
}

export default DefaultPage;
