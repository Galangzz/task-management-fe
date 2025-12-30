import React from 'react';
import { FaStar } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarButton from './NavbarButton.js';
import type { ITabs } from '../../../types/index.js';


type NavbarProps = {
    tabs: ITabs[] | null;
    addList: () => void;
};

function Navbar({ tabs, addList }: NavbarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = location.pathname.split('/')[1] || 'main-task';
    console.log({ currentTab });
    return (
        <div className="NavBar flex w-full items-center border-b-2 px-10!">
            <ul className="scrollbar-hide flex h-full w-max snap-x snap-mandatory items-center gap-x-3 overflow-x-auto overflow-y-clip px-2! font-mono text-xl">
                <li className="flex">
                    <NavbarButton
                        onClick={() => navigate('/starred-task')}
                        active={currentTab === 'starred-task'}
                        aria-label={'Starred Button'}
                    >
                        <FaStar className="flex h-full w-full" />
                    </NavbarButton>

                    {tabs?.map((tab) => (
                        <NavbarButton
                            onClick={() => {
                                if (tab.id === 'main-task') {
                                    navigate('/');
                                    return;
                                }
                                navigate(`/${tab.id}`);
                            }}
                            active={currentTab === tab.id.toString()}
                            key={tab.id}
                        >
                            {tab.name}
                        </NavbarButton>
                    ))}
                    <NavbarButton onClick={addList}>
                        <GoPlus />
                        New List
                    </NavbarButton>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
