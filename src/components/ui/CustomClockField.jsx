import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

function CustomClockField({ time, onChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimeClock
                value={time}
                ampm={false}
                sx={{
                    '& *': {
                        color: 'var(--border-color)',
                    },
                }}
                onChange={onChange}
                
            />
        </LocalizationProvider>
    );
}

export default CustomClockField;
