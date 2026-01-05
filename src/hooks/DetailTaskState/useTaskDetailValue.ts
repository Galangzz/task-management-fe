import { useCallback, useEffect, useRef, useState } from 'react';
import type { ITabs, ITasks } from '../../types/index.js';

export function useTaskDetailValue(tab: ITabs[] | null, task: ITasks | null) {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState<string | null>('');
    const [starred, setStarred] = useState(false);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [hasDate, setHasDate] = useState<boolean>(false);
    const [hasTime, setHasTime] = useState<boolean>(false);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [taskTabId, setTaskTabId] = useState<string | null>(null);

    const detailRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDetail(task.detail);
            setStarred(task.starred);
            setDeadline(task.deadline);
            setHasDate(task.hasDate);
            setHasTime(task.hasTime);
            setIsCompleted(task.isCompleted);
            setTaskTabId(task.taskTabId);
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
            set: (e: React.ChangeEvent<HTMLInputElement>) =>
                setStarred(e.target.checked),
        },
        deadline: {
            value: deadline,
            set: (v: Date | null) => setDeadline(v === null ? null : v),
        },
        hasDate: {
            value: hasDate,
            set: (v: boolean) => setHasDate(v),
        },
        hasTime: {
            value: hasTime,
            set: (v: boolean) => setHasTime(v),
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
