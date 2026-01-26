import Tooltip from '@mui/material/Tooltip';
import { Plus } from 'lucide-react';
import React from 'react';

function AddButton({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Tooltip
            title="Add new task"
            enterDelay={1000}
            arrow
            placement="top"
        >
            <button
                type="button"
                aria-label="Add Button"
                className="bg-accent-button hover:bg-accent-button/80 fixed right-14 bottom-14 z-2 w-fit transform cursor-pointer rounded-full p-2 text-2xl transition! duration-300 ease-in-out hover:scale-110 max-sm:right-7 max-sm:bottom-7"
                onClick={onClick}
            >
                <Plus size={30} />
            </button>
        </Tooltip>
    );
}

export default AddButton;
