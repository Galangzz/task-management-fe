import { useCallback, useContext } from 'react';
import { useTaskStore } from '../useTaskStore.js';
import { ToastContext } from '../../context/Toast.js';
import { updateTask } from '../../services/tasksService.js';
import useToast from '../useToast.js';

function useTaskAction() {
    const toast = useToast();
    const {
        tabs,
        task,
        increaseToast,
        currentTabId,
        optimisticToggleChecked,
        optimisticToggleStarred,
        undoLocalStatus,
        fixChecked,
        decreaseToast,
    } = useTaskStore();

    const handleChecked = useCallback(
        async (id: string, isCompleted: boolean) => {
            console.log({ handleCheckId: id, currentTabId });

            increaseToast();

            setTimeout(async () => {
                optimisticToggleChecked(id);

                const message =
                    isCompleted === true
                        ? 'Tugas Selesai'
                        : 'Tugas ditandai belum selesai';

                toast.undo(
                    message,
                    () => {
                        console.log('Undo clicked');
                        undoLocalStatus(id);
                    },
                    () => {
                        console.log('Toast closed, committing to DB');
                        fixChecked(id, currentTabId, isCompleted);
                    },
                    () => {
                        console.log('Toast animation complete');
                        decreaseToast();
                    }
                );
            }, 300);
        },
        [tabs, task]
    );

    const handleStarred = useCallback(
        async (id: string, starred: boolean) => {
            optimisticToggleStarred(id);
            await updateTask(id, { starred });
        },
        [task, tabs]
    );

    return {
        handleChecked,
        handleStarred,
    };
}

export default useTaskAction;
