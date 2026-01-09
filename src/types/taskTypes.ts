export interface ITask {
    id: string;
    title: string | null;
    detail: string | null;
    createdAt: Date;
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
    starred: boolean;
    isCompleted: boolean;
    taskTabId: string;
}
