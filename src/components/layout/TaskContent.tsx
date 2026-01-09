import React, {
    lazy,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { formatCustomDate } from '../../utils/index.js';

import emptyNoteLight from '../../assets/empty-note-light.svg';
import emptyNoteDark from '../../assets/empty-note-dark.svg';
import completedTaskDark from '../../assets/completed-task-dark.svg';
import completedTaskLight from '../../assets/completed-task-light.svg';

import { ThemeContext } from '../../context/Theme.js';

import ListTask from '../specific/ListTask.js';
import LoadingTaskList from '../ui/Loading/LoadingTaskList.js';
const Dropdown = lazy(() => import('../ui/Dropdown.js'));
import Field from '../ui/Field.js';

import type { ITask, ITab } from '../../types/index.js';

import { AnimatePresence } from 'framer-motion';

type GroupedTasks = Record<string, ITask[]>;

type TaskContentProps = {
    tasks?: ITask[] | null;
    tab?: ITab | null;
    isLoading?: boolean;
    handleChecked: (id: string, value: boolean) => void;
    handleStarred: (id: string, value: boolean) => void;
};

function TaskContent({
    tasks,
    tab,
    isLoading = true,
    handleChecked,
    handleStarred,
}: TaskContentProps) {
    const { theme } = useContext(ThemeContext);

    const [showCompleted, setShowCompleted] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);

    const activeTask = useMemo(
        () => tasks?.filter((t) => t.isCompleted == false) || [],
        [tasks, tab]
    );

    const completeTask = useMemo(
        () => tasks?.filter((t) => t.isCompleted == true) || [],
        [tasks,tab]
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

    const tabId = tab?.id || '';

    const getGroupKey = useCallback((deadline: Date | null) => {
        if (!deadline) return 'TANPA_TANGGAL';

        const today = new Date();

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const d = new Date(deadline);
        if (d < today) return 'TERLEWAT';
        if (d === today) return 'HARI_INI';
        if (d === tomorrow) return 'BESOK';
        return d.toLocaleDateString();
    }, []);

    const groupedData = useMemo(
        () =>
            activeTask?.reduce<GroupedTasks>((acc, item) => {
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

    const colorDate = useCallback((d: string) => {
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
            <div className="animate-fade-in flex h-auto w-full items-center justify-center">
                <Field>
                    <div className="flex">
                        <h1 className="mb-6 text-xl font-bold tracking-wide">
                            {tab?.name ?? 'Stared Task'}
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
                                        <AnimatePresence>
                                            {groupedData[date]?.map((t) => {
                                                const dl =
                                                    t?.deadline &&
                                                    new Date(t?.deadline);
                                                return (
                                                    <div
                                                        key={t.id}
                                                        className="overflow-hidden"
                                                    >
                                                        <ListTask
                                                            key={t.id}
                                                            checked={
                                                                t?.isCompleted ==
                                                                true
                                                            }
                                                            stared={t?.starred}
                                                            id={t?.id}
                                                            handleChecked={
                                                                handleChecked
                                                            }
                                                            handleStarred={
                                                                handleStarred
                                                            }
                                                        >
                                                            <p className="font-semibold">
                                                                {t.title}
                                                            </p>
                                                            {t.detail !==
                                                                null && (
                                                                <p className="ml-2! line-clamp-2 w-full max-w-sm break-all">
                                                                    {t.detail}
                                                                </p>
                                                            )}
                                                            {t.hasTime ==
                                                                true && (
                                                                <div className="ml-2! flex w-fit items-center justify-center opacity-90">
                                                                    {String(
                                                                        dl?.getHours()
                                                                    ).padStart(
                                                                        2,
                                                                        '0'
                                                                    )}
                                                                    :
                                                                    {String(
                                                                        dl?.getMinutes()
                                                                    ).padStart(
                                                                        2,
                                                                        '0'
                                                                    )}
                                                                </div>
                                                            )}
                                                        </ListTask>
                                                    </div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        <div
                            className={`flex h-fit flex-col items-center justify-center gap-8 transition-opacity! duration-500! ease-in-out! ${showCompleted || showEmpty ? 'animate-fade-in' : 'pointer-events-none absolute inset-0 translate-y-4 opacity-0'} mx-auto aspect-3/4 h-full w-full max-w-sm`}
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
                                alt="Task Notification Image"
                                aria-label="Task Notification Image"
                                className="aspect-3/4 h-full max-h-80 w-auto object-contain"
                                fetchPriority="high"
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
                <div className="animate-fade-in flex h-auto w-full items-center justify-center">
                    <Dropdown
                        tasks={completeTask}
                        taskId={tabId}
                        handleChecked={handleChecked}
                    />
                </div>
            )}
        </div>
    );
}

export default TaskContent;
