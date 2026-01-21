import React, {
    lazy,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { formatCustomDate } from '../../utils/index.js';

import ListTask from '../specific/ListTask.js';
import LoadingTaskList from '../ui/Loading/LoadingTaskList.js';
const Dropdown = lazy(() => import('../ui/Dropdown.js'));
import Field from '../ui/Field.js';

import type { ITask, ITab } from '../../types/index.js';

import { AnimatePresence } from 'framer-motion';
import TitleTaskContent from './TitleTaskContent.js';
import MenuTaskContent from './MenuTaskContent.js';
import ImageIndication from './ImageIndication.js';
import TaskContentValue from './TaskContentValue.js';

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
    const [showCompleted, setShowCompleted] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);

    const activeTask = useMemo(
        () => tasks?.filter((t) => t.isCompleted == false) || [],
        [tasks, tab]
    );

    const completeTask = useMemo(
        () => tasks?.filter((t) => t.isCompleted == true) || [],
        [tasks, tab]
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

        if (
            d.getFullYear() < today.getFullYear() ||
            (d.getFullYear() === today.getFullYear() &&
                d.getMonth() <= today.getMonth() &&
                d.getDate() < today.getDate())
        )
            return 'TERLEWAT';
        if (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
        )
            return 'HARI_INI';
        if (
            d.getDate() === tomorrow.getDate() &&
            d.getMonth() === tomorrow.getMonth() &&
            d.getFullYear() === tomorrow.getFullYear()
        )
            return 'BESOK';
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
    console.log({ groupedData });

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
                        <TitleTaskContent title={tab?.name || 'Starred Task'} />
                        {/*TODO*/}
                        {tab?.id !== 'starred-task' && (
                            <MenuTaskContent
                                tabId={tabId}
                                deletePermission={
                                    tab?.deletePermission || false
                                }
                            />
                        )}
                    </div>
                    <div className="relative flex flex-col items-center gap-4">
                        {activeTask.length > 0 &&
                            sortedKeys.map((date) => {
                                const label = formatCustomDate(date);
                                return (
                                    <div
                                        key={date}
                                        className="flex w-full flex-col gap-4"
                                    >
                                        <h2
                                            className={`text-fluid-sm font-bold ${colorDate(label)}`}
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
                                                            <TaskContentValue
                                                                title={t.title}
                                                                detail={
                                                                    t.detail
                                                                }
                                                                hasTime={
                                                                    t.hasTime
                                                                }
                                                                deadline={dl}
                                                            />
                                                        </ListTask>
                                                    </div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}

                        {(showCompleted || showEmpty) && (
                            <ImageIndication
                                showCompleted={showCompleted}
                                tabId={tab?.id || ''}
                            />
                        )}
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
