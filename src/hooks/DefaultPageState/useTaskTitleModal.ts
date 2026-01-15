import { useCallback, useRef, useState } from 'react';
import ApiError from '../../errors/ApiError.js';
import { addTaskTabTitle } from '../../services/taskTabsService.js';
import { useNavigate } from 'react-router-dom';
import useInput from '../useInput.js';

function useTaskTitleModal() {
    const [titleList, setTitleList, onResetTitle] = useInput('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | ApiError | null>(null);
    const timeOutRef = useRef<number | null>(null);
    const navigate = useNavigate();

    const submit = useCallback(async () => {
        setIsLoading(true);
        try {
            const { id } = await addTaskTabTitle({ title: titleList });
            if (timeOutRef.current) clearTimeout(timeOutRef.current);
            timeOutRef.current = setTimeout(() => {
                setError(null);
                onResetTitle();
                setIsLoading(false);
                setIsOpen(false);
                navigate(`/${id}`);
            }, 1000);
        } catch (err) {
            if (err instanceof ApiError) {
                if (err.message === 'To Long') {
                    setError(new Error('Judul terlalu panjang, MAX = 25'));
                } else {
                    setError(err);
                }
                setIsLoading(false);
            } else {
                setError(new Error('Terjadi Kesalahan'));
                setIsLoading(false);
                onResetTitle();
            }
        }
    }, [titleList]);

    const clearTitleModal = useCallback(
        (value: boolean) => {
            onResetTitle();
            setError(null);
            setIsOpen(value);
        },
        [titleList, isOpen, error]
    );

    return {
        titleList,
        setTitleList,
        isOpen,
        setIsOpen,
        isLoading,
        error,
        setError,
        submit,
        clearTitleModal,
    };
}

export default useTaskTitleModal;
