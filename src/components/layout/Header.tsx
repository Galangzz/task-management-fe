import React, { useContext, useEffect, useRef, useState } from 'react';
import ToggleTheme from '../ui/ToggleTheme.js';
import { ThemeContext } from '../../context/Theme.js';
import ProfileIcon from '../ui/ProfileIcon.js';
import ProfileAction from '../ui/ProfileAction.js';

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const profileRef = useRef<HTMLDivElement>(null);
    const [showProfileAction, setShowProfileAction] = useState(false);

    useEffect(() => {
        window.addEventListener('mousedown', (e) => {
            if (!profileRef.current?.contains(e.target as Node)) {
                setShowProfileAction(false);
            }
        });
    }, []);

    return (
        <div className="header realtive flex h-fit w-full items-center justify-center p-2! text-2xl font-extrabold">
            <h1 className="text-fluid-xl">Task</h1>
            <div className="absolute right-0 mx-4! flex items-center justify-center gap-2">
                <div
                    className="relative w-fit"
                    ref={profileRef}
                >
                    <ProfileIcon
                        onClick={() => setShowProfileAction(!showProfileAction)}
                    />
                    <ProfileAction show={showProfileAction} />
                </div>

                <ToggleTheme
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                />
            </div>
        </div>
    );
}

export default Header;
