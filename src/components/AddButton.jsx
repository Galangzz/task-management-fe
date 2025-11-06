import React from 'react';
import { FaPlus } from 'react-icons/fa';

function AddButton() {
    return (
        <button
            type="button"
            className="bg-(--add-button) w-fit p-4 rounded-2xl text-2xl absolute bottom-14 right-14 max-sm:bottom-7 max-sm:right-7 z-50"
        >
            <FaPlus  />
        </button>
    );
}

export default AddButton;
