import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import useInput from './useInput.js';
import {
    useLinkClickHandler,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { useTaskStore } from './useTaskStore.js';
import { addTask } from '../services/tasksService.js';
import { getTaskTabById } from '../services/taskTabsService.js';
import { ToastContext } from '../context/Toast.js';
import type { ApiErrorType } from '../errors/ApiError.js';
import type { ITasks } from '../types/index.js';
import ApiError from '../errors/ApiError.js';

function useNewTask() {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle, onResetTitle] = useInput('');
    const [detail, setDetail, onResetDetail] = useInput('');
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [isSubmitDateTime, setIsSubmitDateTime] = useState(false);
    const [isSubmitTime, setIsSubmitTime] = useState(false);
    const [starred, setStarred] = useState(false);
    const [isOpenConfirmationToClose, setIsOpenConfirmationToClose] =
        useState(false);
    // const [error, setError] = useState('');
    const [selected, setSelected] = useState<Date | null>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    const [error, setError] = useState<Error | ApiError | null>(null);

    const { toast } = useContext(ToastContext);
    console.log({ selected });
    useEffect(() => {
        if (error) {
            console.log({ error });
            if (error instanceof ApiError) {
                toast.error(error);
                setError(null);
            }
        }
    }, [error, toast]);

    useMemo(() => {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        const isValid = selected instanceof Date && !isNaN(selected.getTime());
        console.log({ selected });

        if (!isValid) {
            setSelected(new Date(date));
        } else {
            date = selected;
        }
    }, [selected]);

    const handleInputDetail = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const el = textRef.current;
            if (el) {
                el.style.height = 'auto';
                el.style.height = `${el.scrollHeight}px`;
            }
            setDetail(e);
        },
        [setDetail]
    );

    const handleAddDetail = useCallback(() => {
        setIsOpenDetail(true);
    }, []);

    const handleOpenCalendar = useCallback(() => {
        setIsOpenCalendar(true);
    }, []);

    const handleSubmitDateTime = useCallback(() => {
        setIsOpenCalendar(false);

        setIsSubmitDateTime(true);
    }, []);

    const handleSubmitTime = useCallback(() => {
        setIsOpenTime(false);

        setIsSubmitTime(true);
    }, []);

    const handleCloseModalNewTask = useCallback(
        (setIsOpenModaltask: (p: boolean) => void) => {
            if (title.trim() !== '' || isSubmitDateTime) {
                // @ TODO
                console.log('handleCloseModalNewTask Called');
                setIsOpenConfirmationToClose(true);
                return;
            }
            setIsOpenModaltask(false);
        },
        [title, isSubmitDateTime]
    );

    const handleConfirmationToClose = useCallback(() => {
        onResetTitle();
        setIsSubmitDateTime(false);
        setIsOpenConfirmationToClose(false);
    }, [onResetTitle]);

    const handleSubmitNewTask = useCallback(
        async (
            e: React.FormEvent,
            setIsOpenModaltask: (isOpen: boolean) => void
        ) => {
            e.preventDefault();
            console.log('handleSubmitNewTask');
            try {
                const currentTab =
                    (await getTaskTabById(
                        location.pathname.split('/')[1] || 'main-task'
                    )) ?? 'main-task';

                const newTask = {
                    title: title.trim(),
                    detail: detail,
                    deadline:
                        isSubmitDateTime && selected
                            ? new Date(selected)
                            : null,
                    hasDate: isSubmitDateTime,
                    hasTime: isSubmitTime,
                    starred: starred,
                    isCompleted: false,
                };
                const msg = await addTask(currentTab, newTask);
                toast.success(msg);

                currentTab === 'main-task'
                    ? navigate('/', { replace: true })
                    : navigate(`/${currentTab}`);

                useTaskStore.getState().refreshCurrentTask();
                onResetTitle();
                onResetDetail();
                setIsOpenModaltask(false);
            } catch (err) {
                console.log({ err });
                if (err) {
                    if (
                        err instanceof ApiError &&
                        Object.prototype.hasOwnProperty.call(err, 'errors')
                    ) {
                        setError(err);
                    } else if (err instanceof Error) {
                        setError(err);
                    } else {
                        setError(new Error('Terjadi Kesalahan'));
                    }
                }
            }
        },
        [
            isSubmitDateTime,
            title,
            isSubmitTime,
            selected,
            starred,
            location.pathname,
            navigate,
            detail,
            onResetDetail,
            onResetTitle,
            toast,
            setError,
        ]
    );

    return {
        title,
        detail,
        isOpenDetail,
        isOpenCalendar,
        isOpenTime,
        isSubmitDateTime,
        isSubmitTime,
        isOpenConfirmationToClose,
        selected,
        textRef,
        setTitle,
        starred,
        // error,
        setStarred,
        setIsSubmitDateTime,
        setIsSubmitTime,
        handleSubmitTime,
        handleInputDetail,
        handleAddDetail,
        handleOpenCalendar,
        setIsOpenCalendar,
        setIsOpenTime,
        handleSubmitDateTime,
        setSelected,
        handleSubmitNewTask,
        handleCloseModalNewTask,
        setIsOpenConfirmationToClose,
        handleConfirmationToClose,
        // handleTimeChange,
    };
}

export default useNewTask;
