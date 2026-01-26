import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarButton from './NavbarButton.js';
import type { ITab } from '../../../types/index.js';

import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';

type NavbarProps = {
    tabs: ITab[] | null;
    addList: () => void;
    tabId: string;
};

function Navbar({ tabs, addList, tabId }: NavbarProps) {
    const navigate = useNavigate();
    const currentTab = tabId;
    return (
        <div className="= flex w-full items-center justify-center border-b-2">
            <div className="container">
                <ul className="text-fluid-md relative flex w-full items-center">
                    <li className="navbar flex w-full overflow-x-scroll scroll-smooth whitespace-nowrap">
                        <NavbarButton
                            onClick={() => navigate('/starred-task')}
                            aria-label={'Starred Button'}
                        >
                            {currentTab === 'starred-task' && (
                                <motion.div
                                    className="absolute bottom-0 z-10 h-1 w-2/3 rounded-2xl bg-secondary-foreground"
                                    layoutId="underline"
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 30,
                                    }}
                                />
                            )}
                            <Star className="text-fluid-xl!" />
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
                                        className="absolute bottom-0 z-10 h-1 w-2/3 rounded-2xl bg-secondary-foreground"
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
                            <Plus />
                            New List
                        </NavbarButton>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
