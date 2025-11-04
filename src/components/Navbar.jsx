import React from 'react';
import { FaPlus, FaStar } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Navbar({ tabs, addList }) {
    const navigate = useNavigate();

    return (
        <div className="NavBar min-w-screen flex items-center px-10 py-2 bg-(--background-header)">
            <ul className="flex gap-x-2 font-mono text-xl items-center  w-full h-full">
                <li className="">
                    <Button
                        type={'button'}
                        className={'listTask flex'}
                        onClick={() => navigate('/stared-task')}
                    >
                        <FaStar className="h-full w-full flex " />
                    </Button>
                </li>
                <li className="">
                    <Button
                        type={'button'}
                        className={'listTask'}
                        onClick={() => navigate('/')}
                    >
                        Tugas Saya
                    </Button>
                </li>
                {tabs.map((tab) => (
                    <li key={tab.id}>
                        <Button
                            type={'button'}
                            className={'listTask'}
                            onClick={() => navigate(`/${tab.id}`)}
                        >
                            {tab.title}
                        </Button>
                    </li>
                ))}
                <li className="">
                    <Button
                        type={'button'}
                        className={'listTask flex items-center gap-2'}
                        onClick={addList}
                    >
                        <GoPlus />
                        New List
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
