import React from 'react';
import Field from './Field';
import ListTask from './ListTask';
import StarCheck from './StarCheck';

function TaskContent({ task = {} }) {
    const groupedData = (task.tasks || []).reduce((acc, item) => {
        const dateKey = item.dateDeadline ? item.dateDeadline : 'Tanpa tanggal';

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedData).sort((a, b) => {
        if (a === 'Tanpa tanggal') return 1;
        if (b === 'Tanpa tanggal') return -1;
        return a.localeCompare(b);
    });

    const formatCustomDate = (dateString) => {
        if (dateString == 'Tanpa tanggal') return;
        const dateObj = new Date(dateString);

        const currentYear = new Date().getFullYear();
        const targetYear = dateObj.getFullYear();

        const dateOptions = {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            timeZone: 'Asia/Jakarta',
        };

        if (targetYear !== currentYear) {
            dateOptions.year = 'numeric';
        }

        let formattedDate = dateObj.toLocaleDateString('id-ID', dateOptions);

        formattedDate = formattedDate.replace(/\./g, '').replace(/,\s+/g, ' ').replace(/,\s*$/g, '').trim();

        const parts = formattedDate.split(/\s+/).filter((p) => p.length > 0);
        if (parts.length >= 3) {
            let result = `${parts[0]}, ${parts[1]} ${parts[2]}`;
            if (parts.length === 4) {
                result += ` ${parts[3]}`;
            }
            formattedDate = result;
        }
        return formattedDate;
    };

    return (
        <Field>
            <div className="flex">
                <h1 className="font-bold text-xl tracking-wide mb-6">{task.title ?? 'Stared Task'}</h1>
            </div>
            {task.tasks && (
                <div className="flex flex-col gap-4">
                    {sortedDates.map((date) => (
                        <div
                            key={date}
                            className="flex flex-col gap-4"
                        >
                            <h2 className="font-bold text-lg">{formatCustomDate(date)}</h2>
                            {groupedData[date].map((task, idx) => (
                                <ListTask
                                    key={idx}
                                    checked={task.status}
                                    stared={task.stared}
                                    id={task.id}
                                >
                                    {task.name}
                                </ListTask>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </Field>
    );
}

export default TaskContent;
