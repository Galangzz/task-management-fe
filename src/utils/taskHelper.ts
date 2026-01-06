import type { ITasks } from '../types/index.js';

type isTaskDirtyProps = Omit<ITasks, 'id' | 'createdAt'>;

export function isTaskDirty(
    initial: isTaskDirtyProps | null,
    current: isTaskDirtyProps | null
): boolean {
    if (!initial || !current) return false;

    return (
        initial.title !== current.title ||
        initial.detail !== current.detail ||
        initial.starred !== current.starred ||
        initial.isCompleted !== current.isCompleted ||
        initial.hasDate !== current.hasDate ||
        initial.hasTime !== current.hasTime ||
        !isSameDate(initial.deadline, current.deadline) ||
        initial.taskTabId !== current.taskTabId
    );
}

function isSameDate(a: Date | null, b: Date | null) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return new Date(a).getTime() === new Date(b).getTime();
}
