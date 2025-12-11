import React from 'react';
import { FaPlus, FaStar } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import Button from '../../ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import NavbarButton from './NavbarButton';

function Navbar({ tabs, addList }) {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = location.pathname.split('/')[1] || 'main-task';
    console.log({ currentTab });
    return (
        <div className="NavBar w-full flex items-center px-10!  border-b-2 ">
            <ul className="flex px-2! gap-x-3 font-mono text-xl items-center w-max h-full snap-x snap-mandatory overflow-x-auto overflow-y-clip scrollbar-hide">
                <li className="flex">
                    <NavbarButton
                        onClick={() => navigate('/stared-task')}
                        active={currentTab === 'stared-task' ? 'true' : 'false'}
                    >
                        <FaStar className="h-full w-full flex " />
                    </NavbarButton>

                    {tabs.map((tab) => (
                        <NavbarButton
                            onClick={() => {
                                if (tab.id === 'main-task') {
                                    navigate('/');
                                    return;
                                }
                                navigate(`/${tab.id}`);
                            }}
                            active={currentTab === tab.id.toString() ? 'true' : 'false'}
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
