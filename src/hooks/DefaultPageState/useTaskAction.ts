import { useCallback, useRef } from 'react';
import { useTaskStore } from '../../stores/useTaskStore.js';
import { updateTask } from '../../services/tasksService.js';
import useToast from '../useToast.js';
import { useTabsStore } from '../../stores/useTabStore.js';

function useTaskAction() {
    const toast = useToast();
    const {
        tasks,
        task,
        optimisticToggleChecked,
        optimisticToggleStarred,
        undoLocalStatus,
        fixChecked,
    } = useTaskStore();

    const { tabs, currentTabId, addPendingUpdates, clearPendingUpdates } =
        useTabsStore();

    const starAbortRef = useRef<AbortController | null>(null);

    const handleChecked = useCallback(
        async (id: string, isCompleted: boolean, tabId?: string) => {
            console.log({ handleCheckId: id, currentTabId });

            optimisticToggleChecked(id);
            const foundTask = tasks?.find((task) => task.id === id) || task!;
            console.log({ task, tasks });
            addPendingUpdates(tabId || foundTask?.taskTabId, {
                ...foundTask,
                isCompleted: isCompleted,
            });

            setTimeout(async () => {
                const message =
                    isCompleted === true
                        ? 'Tugas Selesai'
                        : 'Tugas ditandai belum selesai';

                toast.undo(
                    message,
                    () => {
                        console.log('Undo clicked');
                        undoLocalStatus(id);
                        clearPendingUpdates(currentTabId, id);
                    },
                    () => {
                        console.log('Toast closed, committing to DB');
                        fixChecked(id, isCompleted);
                        clearPendingUpdates(currentTabId, id);
                    },
                    () => {
                        console.log('Toast animation complete');
                        clearPendingUpdates(currentTabId, id);
                    }
                );
            }, 300);
        },
        [tabs, tasks, task]
    );

    const handleStarred = useCallback(
        async (id: string, starred: boolean) => {
            if (starAbortRef.current) {
                starAbortRef.current.abort();
            }

            const controller = new AbortController();
            starAbortRef.current = controller;

            optimisticToggleStarred(id);
            try {
                await updateTask(id, { starred }, controller.signal);
            } catch {
                optimisticToggleStarred(id);
            }
        },
        [tasks, tabs]
    );

    return {
        handleChecked,
        handleStarred,
    };
}

export default useTaskAction;
