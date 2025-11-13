import { useCallback, useRef, useState } from 'react';
import useInput from './useInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { addNewTask, getTaskListById } from '../services/localService';

function useTime() {
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useInput('');
    const [detail, setDetail] = useInput('');
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [isSubmitDateTime, setIsSubmitDateTime] = useState(false);
    const [isSubmitTime, setIsSubmitTime] = useState(false);
    const [stared, setStared] = useState(false);
    const [error, setError] = useState('');
    const [selected, setSelected] = useState(new Date());
    // const [time, setTime] = useState(new Date());
    // console.log('Time: ',selected)
    // console.log({ isSubmitTime });

    const textRef = useRef(null);
    

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
            setIsOpenModaltask(false)
        },
        [isSubmitDateTime, title, isSubmitTime, selected, stared, location.pathname, navigate, detail]
    );

    return {
        title,
        detail,
        isOpenDetail,
        isOpenCalendar,
        isOpenTime,
        isSubmitDateTime,
        isSubmitTime,
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
        // handleTimeChange,
    };
}

export default useTime;
