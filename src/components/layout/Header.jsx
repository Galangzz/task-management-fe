import React, { useContext } from 'react';
import ToggleTheme from '../ui/ToggleTheme';
import { ThemeContext } from '../../context/Theme';

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="header realtive flex w-full items-center justify-center p-2! text-2xl font-extrabold">
            <h1>Task</h1>
            
                <ToggleTheme
                    className={'absolute right-0'}
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
            
        </div>
    );
}

export default Header;
