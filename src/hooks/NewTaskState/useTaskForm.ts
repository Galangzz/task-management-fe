import { useCallback, useRef, useState } from 'react';
import useInput from '../useInput.js';

function useTaskForm() {
    const [title, setTitle, resetTitle] = useInput('');
    const [detail, setDetail, resetDetail] = useInput('');
    const [starred, setStarred] = useState(false);
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const handleInputDetail = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const el = textRef.current;
            if (el) {
                el.style.height = 'auto';
                el.style.height = `${el.scrollHeight}px`;
            }
            setDetail(e);
        },
        [setDetail]
    );

    return {
        title,
        detail,
        starred,
        isOpenDetail,
        textRef,
        setTitle,
        setStarred,
        openDetail: () => setIsOpenDetail(true),
        handleInputDetail,
        resetForm: () => {
            resetTitle();
            resetDetail();
            setStarred(false);
            setIsOpenDetail(false);
        },
    };
}

export default useTaskForm;
