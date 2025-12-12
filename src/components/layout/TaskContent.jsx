import React, { lazy, useContext, useMemo } from 'react';
import Field from '../ui/Field';
import ListTask from '../specific/ListTask';
import { formatCustomDate } from '../../utils';

const { CgSpinner } = lazy(() => import('react-icons/cg'));
import emptyNoteLight from '../../assets/empty-note-light.svg';
import emptyNoteDark from '../../assets/empty-note-dark.svg';
import completedTaskDark from '../../assets/completed-task-dark.svg';
import completedTaskLight from '../../assets/completed-task-light.svg';
import Dropdown from '../ui/Dropdown';
import { ThemeContext } from '../../context/Theme';

function TaskContent({ task = {}, isLoading = true, handleChecked }) {
    const { theme } = useContext(ThemeContext);

    const activeTask = useMemo(() => task?.tasks?.filter((t) => t.isCompleted === 0) || [], [task]);

    const completeTask = useMemo(() => task?.tasks?.filter((t) => t.isCompleted === 1) || [], [task]);

    const taskId = task?.id || '';

    const groupedData = activeTask?.reduce((acc, item) => {
        const dateKey = item?.deadline ? new Date(item?.deadline).toLocaleDateString() : '';

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item);
        return acc;
    }, {});
    console.log({ groupedData });

    const sortedDates = Object.keys(groupedData).sort((a, b) => {
        if (a === '') return 1;
        if (b === '') return -1;
        return a.localeCompare(b);
    });
    console.log({ sortedDates });
    console.log({ groupedDataAfterSorted: groupedData });

    const colorDate = (d) => {
        const color = d === 'Hari ini' ? 'text-blue-400!' : d === 'Terlewat' ? 'text-red-500!' : '';

        return color;
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-center w-full h-auto p-8!">
            <div className="flex items-center justify-center w-full h-auto">
                <Field>
                    <div className="flex">
                        <h1 className="font-bold text-xl tracking-wide mb-6">{task.name ?? 'Stared Task'}</h1>
                    </div>
                    {isLoading ? (
                        <CgSpinner />
                    ) : activeTask.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {sortedDates.map((date) => {
                                const label = formatCustomDate(date);
                                return (
                                    <div
                                        key={date}
                                        className="flex flex-col gap-4"
                                    >
                                        <h2 className={`font-bold text-lg ${colorDate(label)}`}>{label}</h2>

                                        {groupedData[date].map((t, idx) => (
                                            <ListTask
                                                key={idx}
                                                checked={t?.isCompleted}
                                                stared={t?.starred}
                                                id={t?.id}
                                                taskId={taskId}
                                                handleChecked={handleChecked}
                                            >
                                                {/* {console.log({ TaskActive: t.title, isCompleted: t.isCompleted })} */}

                                                {t.title}
                                            </ListTask>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ) : completeTask.length > 0 ? (
                        <div className="flex flex-col gap-12 justify-center items-center h-fit py-6">
                            <img
                                src={theme === 'dark' ? completedTaskDark : completedTaskLight}
                                alt="aa"
                                className="h-auto w-60 object-contain"
                            />
                            <p className="w-full font-semibold tracking-widest  text-center text-3xl">
                                Task Telah Selesai
                                <br />
                                Kerja Bagus
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-12 justify-center items-center h-fit py-6">
                            <img
                                src={theme === 'dark' ? emptyNoteDark : emptyNoteLight}
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
