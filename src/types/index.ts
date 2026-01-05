export interface ITasks {
    id: string;
    title: string;
    detail: string | null;
    createdAt: Date;
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
    starred: boolean;
    isCompleted: boolean;
    taskTabId: string;
}

export interface ITabs {
    id: string;
    name: string;
    createdAt: Date;
    deletePermission: boolean;
}

export interface ITabWithTasks extends ITabs {
    tasks: ITasks[];
}
