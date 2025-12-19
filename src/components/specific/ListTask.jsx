import React, { useState } from 'react';
import Checkbox from '../ui/Checkboxes';
import StarCheck from '../ui/StarCheck';
// import { toggleStaredTask } from '../../services/localService';
import { useNavigate } from 'react-router-dom';
// import { updateTask } from '../../services/tasksService';

function ListTask({ children, checked, stared, id, taskId, handleChecked, handleStarred }) {
    const navigate = useNavigate();

    

    const [localChecked, setLocalChecked] = useState(checked);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleChange = (value) => {
        setIsTransitioning(true);
        setLocalChecked(value);
    };

    const handleTransitionEnd = () => {
        if (isTransitioning) {
            handleChecked(id, localChecked);
            setIsTransitioning(false);
        }
    };

    return (
        <div
            className={`flex cursor-pointer items-center gap-4 rounded-xl p-2! transition-all! duration-300! ease-in-out! hover:bg-(--background-color)/40 ${localChecked != checked ? '-translate-y-full opacity-0 delay-300' : 'opacity-100'}`}
            onClick={() => {
                navigate(`/details/${taskId}/${id}`);
            }}
            onTransitionEnd={handleTransitionEnd}
        >
            <Checkbox
                id={id}
                checked={localChecked == true}
                onChange={(value) => {
                    handleChange(value);
                    // handleChecked(id, value);
                }}
            />
            <h1
                className={`flex-1 ${checked ? 'line-through decoration-2' : ''}`}
            >
                {children}
            </h1>
            {!checked && (
                <StarCheck
                    id={id}
                    checked={stared}
                    onChange={(value) => handleStarred(id, value)}
                />
            )}
        </div>
    );
}

export default ListTask;
