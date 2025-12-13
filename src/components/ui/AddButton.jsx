import React from 'react';
import { FaPlus } from 'react-icons/fa';

function AddButton({ onClick }) {
    return (
        <button
            type="button"
            className="fixed right-14 bottom-14 z-2 w-fit transform cursor-pointer rounded-2xl bg-(--add-button) p-4! text-2xl transition! duration-300 ease-in-out hover:scale-110 hover:brightness-125 max-sm:right-7 max-sm:bottom-7"
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
        >
            <FaPlus />
        </button>
    );
}

export default AddButton;
