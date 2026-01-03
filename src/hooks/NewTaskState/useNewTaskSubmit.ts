import { useCallback, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContext } from '../../context/Toast.js';
import { getTaskTabById } from '../../services/taskTabsService.js';
import { addTask } from '../../services/tasksService.js';
import { useTaskStore } from '../useTaskStore.js';
import { handleError } from '../../errors/handleError.js';

type BuildPayloadProps = {
    title: string;
    detail: string;
    starred: boolean;
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
    isCompleted: boolean;
};

function useNewTaskSubmit(
    buildPayload: () => BuildPayloadProps,
    resetForm: () => void,
    tabId: string
) {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useContext(ToastContext);

    const submit = useCallback(
        async (e: React.FormEvent, closeModal: (open: boolean) => void) => {
            e.preventDefault();
            try {
                const currentTab = await getTaskTabById(tabId);

                console.log({ useNewTaskSubmit: currentTab });

                if (buildPayload().title.length >= 50) {
                    throw new Error('Judul terlalu panjang, max = 50');
                }

                const msg = await addTask(currentTab, buildPayload());
                toast.success(msg);

                navigate(`/${tabId}`, {
                    replace: true,
                });

                useTaskStore.getState().refreshCurrentTask();
                resetForm();
                closeModal(false);
            } catch (error) {
                handleError(error, toast);
            }
        },
        [buildPayload, location.pathname, navigate, toast, resetForm]
    );

    return submit;
}

export default useNewTaskSubmit;
