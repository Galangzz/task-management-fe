import React, {
    lazy,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import Field from '../ui/Field';
import ListTask from '../specific/ListTask';
import { formatCustomDate } from '../../utils';

import emptyNoteLight from '../../assets/empty-note-light.svg';
import emptyNoteDark from '../../assets/empty-note-dark.svg';
import completedTaskDark from '../../assets/completed-task-dark.svg';
import completedTaskLight from '../../assets/completed-task-light.svg';
const Dropdown = lazy(() => import('../ui/Dropdown'));
import { ThemeContext } from '../../context/Theme';
import LoadingTaskList from '../ui/LoadingTaskList';

function TaskContent({ task = {}, isLoading = true, handleChecked }) {
    const { theme } = useContext(ThemeContext);

    const [showCompleted, setShowCompleted] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);

    const activeTask = useMemo(
        () => task?.tasks?.filter((t) => t.isCompleted === 0) || [],
        [task]
    );

    const completeTask = useMemo(
        () => task?.tasks?.filter((t) => t.isCompleted === 1) || [],
        [task]
    );

    useEffect(() => {
        if (completeTask.length > 0 && activeTask.length === 0) {
            setShowCompleted(true);
        } else {
            setShowCompleted(false);
        }

        if (activeTask.length === 0 && completeTask.length === 0) {
            setShowEmpty(true);
        } else {
            setShowEmpty(false);
        }
    }, [activeTask.length, completeTask.length]);

    const taskId = task?.id || '';

    const getGroupKey = useCallback((deadline) => {
        if (!deadline) return 'TANPA_TANGGAL';

        const today = new Date();

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const d = new Date(deadline).toLocaleDateString();

        if (d < today.toLocaleDateString()) return 'TERLEWAT';
        if (d === today.toLocaleDateString()) return 'HARI_INI';
        if (d === tomorrow.toLocaleDateString()) return 'BESOK';
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

                if (PRIORITY.includes(a) && PRIORITY.includes(b)) {
                    return PRIORITY.indexOf(a) - PRIORITY.indexOf(b);
                }
                if (PRIORITY.includes(a)) return -1;
                if (PRIORITY.includes(b)) return 1;

                if (a === 'TANPA_TANGGAL') return 1;
                if (b === 'TANPA_TANGGAL') return -1;


                return a.localeCompare(b);
            }),
        [groupedData]
    );

    const colorDate = useCallback((d) => {
        const color =
            d === 'Hari ini'
                ? 'text-blue-400!'
                : d === 'Terlewat'
                  ? 'text-red-500!'
                  : '';

        return color;
    }, []);
    if (isLoading) {
        return <LoadingTaskList />;
    }

    return (
        <div className="flex h-auto w-full flex-col items-center justify-center gap-8 p-8!">
            <div className="flex h-auto w-full items-center justify-center">
                <Field>
                    <div className="flex">
                        <h1 className="mb-6 text-xl font-bold tracking-wide">
                            {task.name ?? 'Stared Task'}
                        </h1>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        {activeTask.length > 0 &&
                            sortedKeys.map((date) => {
                                const label = formatCustomDate(date);
                                return (
                                    <div
                                        key={date}
                                        className="flex w-full flex-col gap-4"
                                    >
                                        <h2
                                            className={`text-lg font-bold ${colorDate(label)}`}
                                        >
                                            {label}
                                        </h2>

                                        {groupedData[date].map((t) => (
                                            <div
                                                key={t.id}
                                                className="animate-fade-in overflow-hidden"
                                            >
                                                <ListTask
                                                    key={t.id}
                                                    checked={
                                                        t?.isCompleted == 1
                                                    }
                                                    stared={t?.starred}
                                                    id={t?.id}
                                                    taskId={taskId}
                                                    handleChecked={
                                                        handleChecked
                                                    }
                                                >
                                                    {t.title}
                                                </ListTask>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        <div
                            className={`flex h-fit flex-col items-center justify-center gap-12 py-6 transition-opacity! duration-500! ease-in-out! ${showCompleted || showEmpty ? 'animate-fade-in' : 'pointer-events-none absolute inset-0 translate-y-4 opacity-0'} `}
                        >
                            <img
                                src={
                                    theme === 'dark'
                                        ? showCompleted
                                            ? completedTaskDark
                                            : emptyNoteDark
                                        : showCompleted
                                          ? completedTaskLight
                                          : emptyNoteLight
                                }
                                alt="Task talah Selesai"
                                className="h-auto w-60 object-contain"
                            />
                            <p className="w-full text-center text-3xl font-semibold tracking-widest">
                                {showCompleted ? (
                                    <>
                                        Task Telah Selesai
                                        <br />
                                        Kerja Bagus
                                    </>
                                ) : (
                                    'Task Kosong'
                                )}
                            </p>
                        </div>
                    </div>
                </Field>
            </div>
            {completeTask.length > 0 && (
                <div className="flex h-auto w-full items-center justify-center">
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
