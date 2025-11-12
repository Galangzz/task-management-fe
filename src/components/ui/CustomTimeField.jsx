import React from 'react';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimeField } from '@mui/x-date-pickers/TimeField';

function CustomTimeField({ format, time }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimeField
                value={time}
                format={format}
                sx={{
                    // bgcolor: 'white',
                    border: '2px solid var(--border-color)',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 0,
                    minWidth: 100,
                    '&:hover': {
                        backdropFilter: 'brightness(120%)',
                    },
                    '& .MuiInputBase-input': {
                        textAlign: 'center',
                        backgroundColor: 'red',
                    },
                    '& .MuiPickersSectionList-root': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 54,
                        width: '100%',
                        fontWeight: 'bold',
                    },
                    '& *': {
                        cursor: 'pointer',
                    },
                }}
                readOnly
            />
        </LocalizationProvider>
    );
}

export default CustomTimeField;
