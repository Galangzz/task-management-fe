import React from 'react';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimeField } from '@mui/x-date-pickers/TimeField';

function CustomTimeField({
    id,
    view,
    format,
    time,
    readOnly,
    onChange,
    onClick,
    onError,
}) {
    const handlePrevent = (e) => {
        e.preventDefault();
    };

    const handleKeyDown = (e) => {
        if (
            (e.ctrlKey || e.metaKey) &&
            ['c', 'v', 'x'].includes(e.key.toLowerCase())
        ) {
            e.preventDefault();
        }
    };

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
                    '& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-focused':
                        {
                            borderRadius: 2,
                        },
                }}
                slotProps={{
                    textField: {
                        inputProps: {
                            onCopy: handlePrevent,
                            onPaste: handlePrevent,
                            onCut: handlePrevent,
                            onKeyDown: handleKeyDown, // tangkap keyboard shortcut
                            style: { userSelect: 'none' },
                        },
                    },
                }}
                onError={onError}
                focused={id === view}
                onClick={onClick}
                readOnly={readOnly}
                required
                onCut={(e) => e.preventDefault()}
                // onCopy={(e) => e.preventDefault()}
                // onPaste={(e) => e.preventDefault()}
            />
        </LocalizationProvider>
    );
}

export default CustomTimeField;
