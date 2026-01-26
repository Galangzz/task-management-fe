import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import type { TimeView } from '@mui/x-date-pickers/models';

type CustomClockFieldProps = {
    time: Date;
    onChange: React.Dispatch<React.SetStateAction<Date | null>>;
    view: TimeView;
    setView: (p: TimeView) => void;
};

function CustomClockField({
    time,
    onChange,
    view,
    setView,
}: CustomClockFieldProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimeClock
                value={time}
                ampm={false}
                sx={{
                    '& *': {
                        color: 'var(--foreground-color)',
                    },
                    '& .MuiClock-clock': {
                        boxShadow: 8,
                        backdropFilter: 'brightness(80%)',
                    },
                    '& .MuiClock-pin': {
                        backgroundColor: 'var(accent-button)',
                    },
                    '& .MuiClockPointer-root': {
                        backgroundColor: 'var(accent-button)',
                    },
                    '& .MuiClockPointer-thumb': {
                        backgroundColor: 'var(accent-button)',
                        borderColor: 'var(accent-button)'
                    },
                    '& .MuiClockNumber-root': {
                        color: 'var(--primary)'
                    },
                    '& .MuiPickersSectionList-sectionContent-MuiPickersInputBase-sectionContent': {
                        userSelect: 'none'
                    },
                }}
                onChange={(newValue) => onChange(newValue)}
                view={view}
                onViewChange={(newView) => setView(newView)}
            />
        </LocalizationProvider>
    );
}

export default CustomClockField;
