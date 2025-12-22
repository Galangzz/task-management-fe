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
                        color: 'var(--border-color) !important',
                    },
                    '& .MuiClock-clock': {
                        boxShadow: 8,
                        backdropFilter: 'brightness(80%)',
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
