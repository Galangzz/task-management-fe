import React from 'react';
import { FaPlus } from 'react-icons/fa';

function AddButton({ onClick }) {
    return (
        <button
            type="button"
            className="bg-(--add-button) 
            w-fit p-4! rounded-2xl text-2xl fixed bottom-14 right-14 max-sm:bottom-7 max-sm:right-7 z-2 
            transition! duration-300 ease-in-out 
            transform 
            hover:scale-110 
            hover:brightness-125
            cursor-pointer
            "
            onClick={onClick}
        >
            <FaPlus />
        </button>
    );
}

export default AddButton;
