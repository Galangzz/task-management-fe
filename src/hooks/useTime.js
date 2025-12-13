import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import useInput from './useInput';
import { useLocation, useNavigate } from 'react-router-dom';
// import { addNewTask, getTaskListById } from '../services/localService';
import { useTaskStore } from './useTaskStore';
import { addTask } from '../services/tasksService';
import { getTaskTabById } from '../services/taskTabsService';
import { ToastContext } from '../context/Toast';

function useTime() {
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
    const [selected, setSelected] = useState(null);
    const textRef = useRef(null);

    const { toast } = useContext(ToastContext);

    useMemo(() => {
        let date = new Date().setHours(0, 0, 0, 0);
        const isValid = selected instanceof Date && !isNaN(selected.getTime());
        console.log({ selected });

        if (!isValid) {
            setSelected(date);
        } else {
            date = selected;
        }
    }, [selected]);

    const handleInputDetail = useCallback(
        (e) => {
            const el = textRef.current;
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight}px`;
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
        (setIsOpenModaltask) => {
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
        async (e, setIsOpenModaltask) => {
            e.preventDefault();
            console.log('handleSubmitNewTask');
            const currentTab =
                (await getTaskTabById(
                    location.pathname.split('/')[1] || 'main-task'
                )) ?? 'main-task';

            const newTask = {
                title: title.trim(),
                detail: detail,
                deadline: isSubmitDateTime ? selected : Number(null),
                hasDate: Number(isSubmitDateTime),
                hasTime: Number(isSubmitTime),
                starred: starred,
                isCompleted: Number(false),
            };
            await addTask(currentTab, newTask);
            toast.success('Catatan Berhasil ditambahkan');

            currentTab === 'main-task'
                ? navigate('/', { replace: true })
                : navigate(`/${currentTab}`);

            useTaskStore.getState().refreshCurrentTask();
            onResetTitle();
            onResetDetail();
            setIsOpenModaltask(false);
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

export default useTime;
