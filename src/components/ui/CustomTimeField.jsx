import React from 'react';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimeField } from '@mui/x-date-pickers/TimeField';

function CustomTimeField({ id, view, format, time, readOnly, onChange, onClick }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimeField
                id={id}
                value={time}
                onChange={onChange}
                format={format}
                sx={{
                    // bgcolor: 'white',
                    boxShadow: 4,
                    borderRadius: 2,
                    backdropFilter: 'brightness(125%)',
                    p: 0,
                    height: 80,
                    minWidth: 100,
                    '&:hover': {
                        backdropFilter: 'brightness(150%)',
                    },
                    '& .MuiInputBase-input': {
                        textAlign: 'center',
                    },
                    '& .MuiPickersInputBase-root': {
                        height: '100%',
                    },
                    '& .MuiPickersSectionList-root': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 54,
                        height: '100%',
                        width: '100%',
                        fontWeight: 'bold',
                    },
                    '& *': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        border: 'none',
                    },
                    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-focused': {
                        borderRadius: 2,
                    },
                }}
                focused={id === view}
                onClick={onClick}
                readOnly={readOnly}
            />
        </LocalizationProvider>
    );
}

export default CustomTimeField;
