import React, { type ReactEventHandler } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimeField } from '@mui/x-date-pickers/TimeField';

type CustomTimeFieldProps = {
    id: 'hours' | 'minutes';
    view: 'hours' | 'minutes';
    format: string;
    time: Date;
    readOnly: boolean;
    onChange: () => void;
    onClick: () => void;
    onError: (error: any) => void;
};

function CustomTimeField({
    id,
    view,
    format,
    time,
    readOnly,
    onChange,
    onClick,
    onError,
}: CustomTimeFieldProps) {
    const handlePrevent = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
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
                            onKeyDown: handleKeyDown,
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
            />
        </LocalizationProvider>
    );
}

export default CustomTimeField;
