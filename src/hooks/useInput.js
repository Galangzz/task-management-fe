import React, { useState } from 'react';

function useInput(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);
    const onValueChangeHandler = (event) => {
        setValue(event.target.value);
    };

    const onResetTitle = () => setValue('');

    return [value, onValueChangeHandler, onResetTitle];
}

export default useInput;
