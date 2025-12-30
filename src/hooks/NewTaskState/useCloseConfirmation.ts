import { useCallback, useState } from 'react';

function useCloseConfirmation(title: string, hasDate: boolean) {
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    const requestClose = useCallback((closeModal: (open: boolean) => void) => {
        if (title.trim() || hasDate) {
            setIsOpenConfirm(true);
            return;
        }
        closeModal(false);
    }, [title, hasDate]);

    return {
        isOpenConfirm,
        requestClose,
        closeConfirm: () => setIsOpenConfirm(false),
        confirmClose: (closeModal: (open: boolean) => void) => {
            setIsOpenConfirm(false);
            closeModal(false);
        },
    };
}

export default useCloseConfirmation;
