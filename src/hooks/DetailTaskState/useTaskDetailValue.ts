import { useCallback, useEffect, useRef, useState } from 'react';
import type { ITab, ITask } from '../../types/index.js';

export function useTaskDetailValue(
    tab: ITab[] | null,
    task: ITask | null,
    setInitialize: React.Dispatch<React.SetStateAction<boolean>>
) {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState<string | null>('');
    const [starred, setStarred] = useState(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [taskTabId, setTaskTabId] = useState<string | null>(null);

    const detailRef = useRef<HTMLTextAreaElement>(null);
    console.log({ taskdetail: task });

    useEffect(() => {
        if (task && Object.keys(task).length === 10) {
            setTitle(task.title as string);
            setDetail(task.detail);
            setStarred(task.starred);
            setIsCompleted(task.isCompleted);
            setTaskTabId(task.taskTabId);
            setInitialize(false);
        }
    }, [task, tab]);

    useEffect(() => {
        if (detail) {
            autoResize();
        }
    }, [detail]);

    const autoResize = useCallback(() => {
        const el = detailRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [detail]);

    const handleInputDetail = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            autoResize();
            setDetail(e.target.value);
        },
        [setDetail]
    );

    return {
        title: {
            value: title,
            set: (e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value),
        },
        detail: {
            value: detail,
            ref: detailRef,
            set: handleInputDetail,
        },
        starred: {
            value: starred,
            set: (v: boolean) => setStarred(v),
        },
        isCompleted: {
            value: isCompleted,
            set: (v: boolean) => setIsCompleted(v),
        },
        taskTabId: {
            value: taskTabId,
            set: (v: string) => setTaskTabId(v),
        },
    };
}
