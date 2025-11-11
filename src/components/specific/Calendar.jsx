import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

function Calendar() {
    const [selected, setSelected] = useState(new Date);

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
