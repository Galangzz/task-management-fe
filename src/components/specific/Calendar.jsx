import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

function Calendar({selected, setSelected}) {

    return (
        <DayPicker
            animate
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={selected ? `Selected: ${selected.toLocaleDateString()}` : 'Pick a day.'}
        />
    );
}

export default Calendar;
