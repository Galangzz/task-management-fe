import React, { useContext } from 'react';
import Switch from './Switch';
import { ThemeContext } from '../context/Theme';

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="header realtive p-2 min-w-screen justify-center flex text-2xl font-extrabold">
            <h1>Task</h1>
            <Switch
                className={'absolute right-0'}
                checked={theme == 'dark' ? true : false}
                onChange={toggleTheme}
            />
        </div>
    );
}

export default Header;
