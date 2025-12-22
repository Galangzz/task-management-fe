import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

type CalendarProps = {
    selected: Date;
    setSelected: () => void;
};

function Calendar({ selected, setSelected }: CalendarProps) {
    return (
        <DayPicker
            animate
            mode="single"
            navLayout="around"
            selected={selected}
            onSelect={setSelected}
            required
            // footer={selected ? `Selected: ${selected.toLocaleDateString()}` : 'Pick a day.'}
        />
    );
}

export default Calendar;
