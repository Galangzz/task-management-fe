import React from 'react';
import Checkbox from './Checkboxes';
import StarCheck from './StarCheck';
import { getAllTasks, toggleStaredTask, toggleStatusTask } from '../services/localService';

function ListTask({ children, checked, stared, id }) {
    const handleChecked = (id) => {
        toggleStatusTask(id);
    };

    const handleStared = (id) => {
        toggleStaredTask(id);
        console.log(getAllTasks());
    };

    return (
        <div className="flex items-center gap-4 p-2">
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
