import React, { useState } from 'react';
import Checkbox from '../ui/Checkboxes.js';
import StarCheck from '../ui/StarCheck.js';
import { useNavigate } from 'react-router-dom';
// import { updateTask } from '../../services/tasksService';

type LisTaskProps = {
    children: React.ReactNode;
    checked: boolean;
    stared: boolean;
    id: string;
    taskId: string;
    handleChecked: (id: string, checked: boolean) => void;
    handleStarred: (id: string, checked: boolean) => void;
};

function ListTask({
    children,
    checked,
    stared,
    id,
    taskId,
    handleChecked,
    handleStarred,
}: LisTaskProps) {
    const navigate = useNavigate();

    const [localChecked, setLocalChecked] = useState(checked);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleChange = (value: boolean) => {
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
                onChange={handleChange}
            />
            <div
                className={`flex-1 flex-col${checked ? 'line-through decoration-2' : ''}`}
            >
                {children}
            </div>
            {!checked && (
                <StarCheck
                    id={id}
                    checked={stared}
                    onChange={(value: boolean) => handleStarred(id, value)}
                />
            )}
        </div>
    );
}

export default ListTask;
