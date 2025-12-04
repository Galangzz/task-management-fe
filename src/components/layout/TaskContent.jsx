import React, { useMemo } from 'react';
import Field from '../ui/Field';
import ListTask from '../specific/ListTask';
import { formatCustomDate } from '../../utils';
import { CgSpinner } from 'react-icons/cg';
import emptyNote from '../../assets/empty-note.svg';
import Dropdown from '../ui/Dropdown';

function TaskContent({ task = {}, isLoading = true, handleChecked }) {
    const activeTask = useMemo(() => task?.tasks?.filter((t) => t.status === false) || [], [task]);

    const completeTask = useMemo(() => task?.tasks?.filter((t) => t.status === true) || [], [task]);

    const taskId = task?.id || '';
    const groupedData = activeTask?.reduce((acc, item) => {
        const dateKey = item.dateDeadline ? item.dateDeadline : 'Tanpa tanggal';

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
        return acc;
    }, {});

    const sortedDates =
        Object.keys(groupedData).sort((a, b) => {
            if (a === 'Tanpa tanggal') return 1;
            if (b === 'Tanpa tanggal') return -1;
            return a.localeCompare(b);
        }) || [];

    return (
        <div className="flex flex-col gap-8 items-center justify-center w-full h-auto p-8!">
            <div className="flex items-center justify-center w-full h-auto">
                <Field>
                    <div className="flex">
                        <h1 className="font-bold text-xl tracking-wide mb-6">{task.title ?? 'Stared Task'}</h1>
                    </div>
                    {isLoading ? (
                        <CgSpinner />
                    ) : activeTask.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {sortedDates.map((date) => (
                                <div
                                    key={date}
                                    className="flex flex-col gap-4"
                                >
                                    {formatCustomDate(date) === 'Hari ini' ? (
                                        <h2 className="font-bold text-lg text-red-400!">{formatCustomDate(date)}</h2>
                                    ) : formatCustomDate(date) === 'Besok' ? (
                                        <h2 className="font-bold text-lg text-blue-400!">{formatCustomDate(date)}</h2>
                                    ) : (
                                        <h2 className="font-bold text-lg">{formatCustomDate(date)}</h2>
                                    )}
                                    {groupedData[date].map((t, idx) => (
                                        <ListTask
                                            key={idx}
                                            checked={t?.status}
                                            stared={t?.stared}
                                            id={t?.id}
                                            taskId={taskId}
                                            handleChecked={handleChecked}
                                        >
                                            {console.log({ TaskActive: t.name, status: t.status })}

                                            {t.name}
                                        </ListTask>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-12 justify-center items-center h-fit py-6">
                            <img
                                src={emptyNote}
                                alt="aa"
                                className="h-auto w-60 object-contain"
                            />
                            <p className="w-full font-semibold tracking-widest  text-center text-3xl">Task Kosong</p>
                        </div>
                    )}
                </Field>
            </div>
            {completeTask.length > 0 && (
                <div className="flex items-center justify-center w-full h-auto">
                    <Dropdown
                        tasks={completeTask}
                        taskId={taskId}
                        handleChecked={handleChecked}
                    />
                </div>
            )}
        </div>
    );
}

export default TaskContent;
