import React, { useState } from 'react';

function useInput(defaultValue: string = '') {
    const [value, setValue] = useState(defaultValue);
    const onValueChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValue(event.target.value);
    };

    const onResetTitle = () => setValue('');

    return [value, onValueChangeHandler, onResetTitle] as const;
}

export default useInput;
