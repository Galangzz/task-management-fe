import React, { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { Navigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { ThemeProvider } from '../context/Theme';

function DefaultPage() {
    const [tabs, setTabs] = useState([{ id: 1 }]);
    const [theme, toggleTheme] = useTheme();

    // const currentId = location.pathname.split('/tab/')[1];

    const addTab = () => {
        const newId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
        setTabs([...tabs, { id: newId }]);
        Navigate(`/tab/${newId}`);
    };

    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
            <div >
                <Header />
                <Navbar
                    tabs={tabs}
                    addList={addTab}
                />
                <button type="button">aaa</button>
            </div>
        </ThemeProvider>
    );
}

export default DefaultPage;
