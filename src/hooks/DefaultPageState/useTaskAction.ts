import { useCallback, useContext } from 'react';
import { useTaskStore } from '../../stores/useTaskStore.js';
import { ToastContext } from '../../context/Toast.js';
import { updateTask } from '../../services/tasksService.js';
import useToast from '../useToast.js';
import { useTabsStore } from '../../stores/useTabStore.js';

function useTaskAction() {
    const toast = useToast();
    const {
        tasks,
        optimisticToggleChecked,
        optimisticToggleStarred,
        undoLocalStatus,
        fixChecked,
    } = useTaskStore();

    const { tabs, currentTabId, addPendingUpdates, clearPendingUpdates } =
        useTabsStore();

    const handleChecked = useCallback(
        async (id: string, isCompleted: boolean) => {
            console.log({ handleCheckId: id, currentTabId });

            optimisticToggleChecked(id);
            const task = tasks?.find((task) => task.id === id)!;
            addPendingUpdates(currentTabId, { ...task, isCompleted });

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
                        fixChecked(id, currentTabId, isCompleted);
                        clearPendingUpdates(currentTabId, id);
                    },
                    () => {
                        console.log('Toast animation complete');
                        clearPendingUpdates(currentTabId, id);
                    }
                );
            }, 300);
        },
        [tabs, tasks]
    );

    const handleStarred = useCallback(
        async (id: string, starred: boolean) => {
            optimisticToggleStarred(id);
            await updateTask(id, { starred });
        },
        [tasks, tabs]
    );

    return {
        handleChecked,
        handleStarred,
    };
}

export default useTaskAction;
