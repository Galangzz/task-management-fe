import { useEffect, useState } from 'react';

function useTaskDateTime() {
    const [selected, setSelected] = useState<Date | null>(null);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [hasDate, setHasDate] = useState(false);
    const [hasTime, setHasTime] = useState(false);

    useEffect(() => {
        if (!selected || isNaN(selected.getTime())) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            setSelected(date);
        }
    }, [selected]);

    return {
        selected,
        isOpenCalendar,
        isOpenTime,
        hasDate,
        hasTime,
        openCalendar: () => setIsOpenCalendar(true),
        closeCalendar: () => setIsOpenCalendar(false),
        submitDate: () => {
            setIsOpenCalendar(false);
            setHasDate(true);
        },
        submitTime: () => {
            setIsOpenTime(false);
            setHasTime(true);
        },
        unSubmitTime: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
            setHasTime(false);
        },
        setSelected,
        setIsOpenTime,
    };
}

export default useTaskDateTime;
