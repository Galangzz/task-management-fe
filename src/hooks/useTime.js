import { useCallback, useEffect, useRef, useState } from 'react';
import useInput from './useInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { addNewTask, getTaskListById } from '../services/localService';
import { useTaskStore } from './useTaskStore';

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
    const [stared, setStared] = useState(false);
    const [isOpenConfirmationToClose, setIsOpenConfirmationToClose] = useState(false);
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(new Date());
    const textRef = useRef(null);

    useEffect(() => {
        let date = new Date();
        const isValid = selected instanceof Date && !isNaN(selected.getTime());

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
            let id = '';
            let newTask = {};
            let deadline = null;

            if (isSubmitDateTime) {
                const date = new Date(selected);

                if (!isSubmitTime) {
                    date.setHours(0, 0, 0, 0);
                }
                deadline = date;
            }
            newTask = {
                name: title.trim(),
                detail: detail,
                dateDeadline: deadline,
                stared: stared,
                status: false,
            };

            const currentTab = location.pathname.split('/')[1];
            const newTaskList = getTaskListById(currentTab);
            if (!newTaskList && currentTab) {
                id = 'main-task';
                const { err } = await addNewTask(id, newTask);
                if (err) {
                    setError(err);
                    return;
                }
                navigate('/', { replace: true });
            } else {
                id = newTaskList.id;
                const { err } = await addNewTask(id, newTask);
                if (err) {
                    setError(err);
                    return;
                }
                navigate(`/${currentTab}`);
            }
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
            stared,
            location.pathname,
            navigate,
            detail,
            onResetDetail,
            onResetTitle,
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
        // time,
        textRef,
        setTitle,
        stared,
        error,
        setStared,
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
