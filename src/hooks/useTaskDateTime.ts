import { useEffect, useState } from 'react';

type defaultDeadlineProps = {
    defaultDate: Date | null;
    hasDate: boolean;
    hasTime: boolean;
};

function useTaskDateTime(defaultValue: defaultDeadlineProps | null) {
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [hasDate, setHasDate] = useState(false);
    const [hasTime, setHasTime] = useState(false);
    useEffect(() => {
        if (defaultValue) {
            const { defaultDate, hasDate, hasTime } = defaultValue;
            setDeadline(defaultDate);
            setHasDate(hasDate);
            setHasTime(hasTime);
        }
        if (!defaultValue) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            setDeadline(date);
            setHasDate(false);
            setHasTime(false);
        }
        // if (!deadline ) {
        //     const date = new Date();
        //     date.setHours(0, 0, 0, 0);
        //     setDeadline(date);
        // }
    }, [defaultValue?.defaultDate]);

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
