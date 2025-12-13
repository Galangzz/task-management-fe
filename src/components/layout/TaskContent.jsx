import React, { lazy, useCallback, useContext, useMemo } from 'react';
import Field from '../ui/Field';
import ListTask from '../specific/ListTask';
import { formatCustomDate } from '../../utils';

const { CgSpinner } = lazy(() => import('react-icons/cg'));
import emptyNoteLight from '../../assets/empty-note-light.svg';
import emptyNoteDark from '../../assets/empty-note-dark.svg';
import completedTaskDark from '../../assets/completed-task-dark.svg';
import completedTaskLight from '../../assets/completed-task-light.svg';
const Dropdown = lazy(() => import('../ui/Dropdown'));
import { ThemeContext } from '../../context/Theme';

function TaskContent({ task = {}, isLoading = true, handleChecked }) {
    const { theme } = useContext(ThemeContext);

    const activeTask = useMemo(() => task?.tasks?.filter((t) => t.isCompleted === 0) || [], [task]);

    const completeTask = useMemo(() => task?.tasks?.filter((t) => t.isCompleted === 1) || [], [task]);

    const taskId = task?.id || '';

    const getGroupKey = useCallback((deadline) => {
        if (!deadline) return 'TANPA_TANGGAL';

        // const now = new Date();

        const today = new Date();

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const d = new Date(deadline).toLocaleDateString();

        if (d < today.toLocaleDateString()) return 'TERLEWAT';
        if (d === today.toLocaleDateString()) return 'HARI_INI';
        if (d === tomorrow.toLocaleDateString()) return 'BESOK';
        // tanggal lain → pakai tanggal aslinya
        return d;
    }, []);

    const groupedData = useMemo(
        () =>
            activeTask?.reduce((acc, item) => {
                const dateKey = getGroupKey(item.deadline);

                if (!acc[dateKey]) acc[dateKey] = [];
                acc[dateKey].push(item);
                return acc;
            }, {}),
        [activeTask, getGroupKey]
    );


    const sortedKeys = useMemo(
        () =>
            Object.keys(groupedData).sort((a, b) => {
                const PRIORITY = ['TERLEWAT', 'HARI_INI', 'BESOK'];

                // Prioritas utama
                if (PRIORITY.includes(a) && PRIORITY.includes(b)) {
                    return PRIORITY.indexOf(a) - PRIORITY.indexOf(b);
                }
                if (PRIORITY.includes(a)) return -1;
                if (PRIORITY.includes(b)) return 1;

                // Tanpa tanggal selalu terakhir
                if (a === 'TANPA_TANGGAL') return 1;
                if (b === 'TANPA_TANGGAL') return -1;

                // DATE:YYYY-MM-DD → sort ASC

                return a.localeCompare(b);
            }),
        [groupedData]
    );

    const colorDate = useCallback((d) => {
        const color = d === 'Hari ini' ? 'text-blue-400!' : d === 'Terlewat' ? 'text-red-500!' : '';

        return color;
    }, []);
    return (
        <div className="flex flex-col gap-8 items-center justify-center w-full h-auto p-8!">
            <div className="flex items-center justify-center w-full h-auto">
                <Field>
                    <div className="flex">
                        <h1 className="font-bold text-xl tracking-wide mb-6">{task.name ?? 'Stared Task'}</h1>
                    </div>
                    {isLoading ? (
                        // TODO lAZY
                        <CgSpinner />
                    ) : activeTask.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {sortedKeys.map((date) => {
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
