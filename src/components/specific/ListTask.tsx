import React, { useState } from 'react';
import Checkbox from '../ui/Checkboxes.js';
import StarCheck from '../ui/StarCheck.js';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/useTaskStore.js';
import type { ITask } from '../../types/index.js';

type LisTaskProps = {
    children: React.ReactNode;
    checked: boolean;
    stared: boolean;
    id: string;
    handleChecked: (id: string, checked: boolean) => void;
    handleStarred: (id: string, checked: boolean) => void;
};

function ListTask({
    children,
    checked,
    stared,
    id,
    handleChecked,
    handleStarred,
}: LisTaskProps) {
    const navigate = useNavigate();

    const [localChecked, setLocalChecked] = useState(checked);
    const { setTask, getTask } = useTaskStore();

    const handleChange = (value: boolean) => {
        setLocalChecked(() => value);
        const t = setTimeout(() => {
            handleChecked(id, value);
        }, 300);
        
        return () => clearTimeout(t);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 30, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 0, y: -30 }}
            transition={{
                ease: 'easeInOut',
                duration: 0.3,
            }}
            className={`flex cursor-pointer items-center gap-4 rounded-xl p-2! hover:bg-(--background-color)/40`}
            onClick={() => {
                const task = getTask(id);
                setTask((task as ITask) || null);
                navigate(`/details/${id}`);
            }}
        >
            <Checkbox
                id={id}
                checked={localChecked}
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
        </motion.div>
    );
}

export default ListTask;
