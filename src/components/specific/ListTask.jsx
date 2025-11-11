import React from 'react';
import Checkbox from '../ui/Checkboxes';
import StarCheck from '../ui/StarCheck';
import { toggleStaredTask, toggleStatusTask } from '../../services/localService';
import { useNavigate } from 'react-router-dom';

function ListTask({ children, checked, stared, id, taskId }) {
    const navigate = useNavigate();
    const handleChecked = (id) => {
        toggleStatusTask(id);
    };

    const handleStared = (id) => {
        toggleStaredTask(id);
        // console.log(getAllTasks());
    };

    return (
        <div
            className="flex items-center gap-4 p-2 hover:bg-(--background-color)/40 cursor-pointer rounded-xl"
            onClick={() => {
                navigate(`/details/${taskId}/${id}`);
            }}
        >
            <Checkbox
                id={id}
                checked={checked}
                onChange={() => handleChecked(id)}
            />
            <h3 className="flex-1">{children}</h3>
            <StarCheck
                id={id}
                checked={stared}
                onChange={() => handleStared(id)}
            />
        </div>
    );
}

export default ListTask;
