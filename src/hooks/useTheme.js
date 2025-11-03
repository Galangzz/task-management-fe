import React, { useEffect, useState } from 'react';

function useTheme(defaultValue = 'light') {
    const [value, setValue] = useState(defaultValue);
    const onValueChangeHandler = () => {
        setValue((prevValue) => {
            const newTheme = prevValue === 'light' ? 'dark' : 'light';
            return newTheme;
        });
    };

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        setValue(theme ?? defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('theme', value);
    }, [value]);

    return [value, onValueChangeHandler];
}

export default useTheme;
