import React, { useEffect, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark'

function useTheme(defaultValue: Theme = 'light'): [Theme, () => void] {
    const [value, setValue] = useState(() => {
        return localStorage.getItem('theme') as Theme ?? defaultValue;
    });
    const onValueChangeHandler = () => {
        setValue((prevValue) => {
            const newTheme = prevValue === 'light' ? 'dark' : 'light';
            return newTheme;
        });
    };

    useEffect(() => {
        const theme = localStorage.getItem('theme') as Theme;
        setValue(theme ?? defaultValue);
    }, [defaultValue]);

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('theme', value);
    }, [value]);

    return [value, onValueChangeHandler];
}

export default useTheme;
