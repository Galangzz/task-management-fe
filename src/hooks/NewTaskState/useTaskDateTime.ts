import { useEffect, useState } from 'react';

function useTaskDateTime() {
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [hasDate, setHasDate] = useState(false);
    const [hasTime, setHasTime] = useState(false);

    //Coba hapus
    useEffect(() => {
        if (!deadline || isNaN(deadline.getTime())) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            setDeadline(date);
        }
    }, [deadline]);

    return {
        deadline: {
            value: deadline,
            setValue: setDeadline,
        },
        toggleCalendar: {
            isOpen: isOpenCalendar,
            open: () => setIsOpenCalendar(true),
            close: () => setIsOpenCalendar(false),
        },
        toggleTime: {
            isOpen: isOpenTime,
            open: () => setIsOpenTime(true),
            close: () => setIsOpenTime(false),
        },
        hasDate,
        hasTime,
        date: {
            submit: () => {
                setIsOpenCalendar(false);
                setHasDate(true);
            },
            unSubmit: () => {
                setDeadline(null);
                setHasDate(false);
                setHasTime(false);
            },
        },
        time: {
            submit: () => {
                setIsOpenTime(false);
                setHasTime(true);
            },
            unSubmit: () => {
                setHasTime(false);
            },
        },
    };
}

export default useTaskDateTime;
