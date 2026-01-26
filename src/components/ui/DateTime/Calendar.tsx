import React from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import 'react-day-picker/style.css';

type CalendarProps = {
    selected: Date | null;
    setSelected: React.Dispatch<React.SetStateAction<Date | null>>;
};

function Calendar({ selected, setSelected }: CalendarProps) {
    const defaultClassNames = getDefaultClassNames();
    return (
        <DayPicker
            animate
            mode="single"
            navLayout="around"
            selected={selected!}
            onSelect={setSelected}
            required
            classNames={{
                selected: `border-accent-button border-2 font-bold! text-xl`,
                today: 'text-accent-button underline',
                chevron: 'fill-accent-button'
            }}
        />
    );
}

export default Calendar;
