import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import type { TimeView } from '@mui/x-date-pickers/models';

type CustomClockFieldProps = {
    time: Date;
    onChange: () => void;
    view: 'hours' | 'minutes';
    setView: (p: TimeView) => void;
};

function CustomClockField({ time, onChange, view, setView }: CustomClockFieldProps) {
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

                        // bgcolor: 'var(--background-color)'
                        backdropFilter: 'brightness(80%)',
                    },
                }}
                onChange={onChange}
                view={view}
                onViewChange={(newView) => setView(newView)}
            />
        </LocalizationProvider>
    );
}

export default CustomClockField;
