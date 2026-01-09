import React, { useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import NavbarButton from './NavbarButton.js';
import type { ITab } from '../../../types/index.js';

import { motion } from 'framer-motion';

type NavbarProps = {
    tabs: ITab[] | null;
    addList: () => void;
    tabId: string;
};

function Navbar({ tabs, addList, tabId }: NavbarProps) {
    const navigate = useNavigate();
    const currentTab = tabId;
    return (
        <div className="NavBar flex w-full items-center border-b-2 px-10!">
            <ul className="scrollbar-hide flex h-full w-max snap-x snap-mandatory items-center gap-x-3 overflow-x-auto overflow-y-clip px-2! font-mono text-xl">
                <li className="flex">
                    <NavbarButton
                        onClick={() => navigate('/starred-task')}
                        aria-label={'Starred Button'}
                    >
                        {currentTab === 'starred-task' && (
                            <motion.div
                                className="absolute bottom-0 z-10 h-1 w-2/3 rounded-2xl bg-(--underline-navbar)"
                                layoutId="underline"
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                        <FaStar className="flex h-full w-full" />
                    </NavbarButton>

                    {tabs?.map((tab) => (
                        <NavbarButton
                            onClick={() => {
                                navigate(`/${tab.id}`);
                            }}
                            key={tab.id}
                        >
                            {currentTab === tab.id.toString() && (
                                <motion.div
                                    className="absolute bottom-0 z-10 h-1 w-2/3 rounded-2xl bg-(--underline-navbar)"
                                    layoutId="underline"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
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
