import { useCallback, useRef, useState } from 'react';
import ApiError from '../../errors/ApiError.js';
import { addNewTabTitle } from '../../services/taskTabsService.js';
import { useNavigate } from 'react-router-dom';
import useInput from '../useInput.js';
import { useTabsStore } from '../../stores/useTabStore.js';

function useTaskTitleModal() {
    const [titleList, setTitleList, onResetTitle] = useInput('');
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | ApiError | null>(null);
    const timeOutRef = useRef<number | null>(null);
    const navigate = useNavigate();
    const { tabs, setTab, optimisticAddTab } = useTabsStore();

    const submit = useCallback(async () => {
        setIsLoading(true);
        try {
            const { id, name, createdAt, deletePermission } =
                await addNewTabTitle({ title: titleList });
            optimisticAddTab({ id, name, createdAt, deletePermission });
            console.log({ NewTab: tabs });
            setTab(id);

            setError(null);
            onResetTitle();
            setIsLoading(false);
            setIsOpen(false);
            console.log({ NewTab: tabs });
            navigate(`/${id}`);
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
