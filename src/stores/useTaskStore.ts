import { create } from 'zustand';

import { getTasksByTabId, updateTask } from '../services/tasksService.js';
import type { ITask } from '../types/index.js';
import { handleError } from '../errors/handleError.js';

export interface TaskState {
    tasks: ITask[] | null;
    task: ITask | null;

    getTask: (id: string) => ITask | null;
    setTask: (task: ITask) => void;
    setTasks: (tasks: ITask[]) => void;

    // Actions
    loadTask: (tabId: string, signal?: AbortSignal) => Promise<void>;
    refreshCurrentTask: (tabId: string) => Promise<void>;
    refreshTasks: () => void;

    fixChecked: (id: string, isCompleted: boolean) => Promise<void>;
    undoLocalStatus: (id: string) => void;
    optimisticToggleChecked: (id: string) => void;
    optimisticToggleStarred: (id: string) => void;
    optimisticDeleteTasks: (id: string) => void;
    resetTaskStore: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: null,
    task: null,

    getTask: (id: string) => {
        const { tasks } = get();
        return tasks?.find((task) => task.id === id) || null;
    },

    setTask: (task) => {
        set({ task });
    },

    setTasks: (v) => {
        const { tasks } = get();
        const map = new Map<string, ITask>();

        tasks?.forEach((t) => map.set(t.id, t));
        v.forEach((t) => map.set(t.id, t));

        set({ tasks: Array.from(map.values()) });
    },

    // Load task list for specific tab
    loadTask: async (tabId, signal) => {
        try {
            const data = await getTasksByTabId(tabId, signal);
            console.log({ Tasks: data });
            set({ tasks: data });
        } catch (err) {
            throw err;
        }
    },

    refreshCurrentTask: async (tabId) => {
        try {
            const data = await getTasksByTabId(tabId);
            set({ tasks: data });
        } catch (err) {
            handleError(err);
        }
    },

    refreshTasks: () => {
        set({ tasks: null });
    },

    fixChecked: async (id, isCompleted) => {
        try {
            await updateTask(id, { isCompleted });
        } catch (err) {
            get().undoLocalStatus(id);
            handleError(err);
        }
    },

    undoLocalStatus: (id) => {
        const { tasks } = get();
        set({
            tasks:
                tasks?.map((t: any) =>
                    t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
                ) || null,
        });
    },

    optimisticToggleChecked: (id) => {
        const { tasks } = get();
        set({
            tasks:
                tasks?.map((t: any) =>
                    t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
                ) || null,
        });
    },

    optimisticToggleStarred: (id) => {
        const { tasks } = get();
        set({
            tasks:
                tasks?.map((t: any) =>
                    t.id === id ? { ...t, starred: !t.starred } : t
                ) || null,
        });
    },

    optimisticDeleteTasks: (id) => {
        const { tasks } = get();
        console.log('Optimistic Delete called...');
        set({
            tasks: tasks?.filter((t: any) => t.id !== id) || tasks,
        });
    },

    resetTaskStore: () => {
        console.log('Reset TaskStore');
        set({
            tasks: null,
            task: null,
        });
    },
}));
