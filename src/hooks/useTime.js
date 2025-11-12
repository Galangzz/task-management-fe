import { useCallback, useRef, useState } from 'react';
import useInput from './useInput';

function useTime() {
    const [title, setTitle] = useInput('');
    const [detail, setDetail] = useInput('');
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [isSubmitDateTime, setIsSubmitDateTime] = useState(false);
    const [isSubmitTime, setIsSubmitTime] = useState(false);
    const [selected, setSelected] = useState(new Date());
    // const [time, setTime] = useState(new Date());
    // console.log('Time: ',selected)

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

    // const handleTimeChange = useCallback((newTime) => {
    //     setTime(newTime);
    // }, []);

    return [
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
        setIsSubmitDateTime,
        setIsSubmitTime,
        handleInputDetail,
        handleAddDetail,
        handleOpenCalendar,
        setIsOpenCalendar,
        setIsOpenTime,
        handleSubmitDateTime,
        setSelected,
        // handleTimeChange,
    ];
}

export default useTime;
