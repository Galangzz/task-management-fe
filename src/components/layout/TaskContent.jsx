import React, { useContext, useMemo } from 'react';
import Field from '../ui/Field';
import ListTask from '../specific/ListTask';
import { formatCustomDate } from '../../utils';
import { CgSpinner } from 'react-icons/cg';
import emptyNoteLight from '../../assets/empty-note-light.svg';
import emptyNoteDark from '../../assets/empty-note-dark.svg';
import completedTaskDark from '../../assets/completed-task-dark.svg';
import completedTaskLight from '../../assets/completed-task-light.svg';
import Dropdown from '../ui/Dropdown';
import { ThemeContext } from '../../context/Theme';

function TaskContent({ task = {}, isLoading = true, handleChecked }) {
    const { theme } = useContext(ThemeContext);
    console.log({TaskTaskContent: task})

    const activeTask = useMemo(() => task?.tasks?.filter((t) => t.isCompleted === 0) || [], [task]);

    const completeTask = useMemo(() => task?.tasks?.filter((t) => t.isCompleted === 1) || [], [task]);

    const taskId = task?.id || '';
    const groupedData = activeTask?.reduce((acc, item) => {
        const dateKey = item.deadline ? item.deadline : 'Tanpa tanggal';

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
                        <h1 className="font-bold text-xl tracking-wide mb-6">{task.name ?? 'Stared Task'}</h1>
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
                                            checked={t?.isCompleted}
                                            stared={t?.stared}
                                            id={t?.id}
                                            taskId={taskId}
                                            handleChecked={handleChecked}
                                        >
                                            {console.log({ TaskActive: t.name, isCompleted: t.isCompleted })}

                                            {t.title}
                                        </ListTask>
                                    ))}
                                </div>
                            ))}
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
