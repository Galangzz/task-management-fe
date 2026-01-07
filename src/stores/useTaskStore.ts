import { create } from 'zustand';
import {
    getTaskTabs,
    getTaskTabWithTasks,
} from '../services/taskTabsService.js';
import { getTasksByTabId, updateTask } from '../services/tasksService.js';
import type { ITabs, ITabWithTasks, ITasks } from '../types/index.js';
import { handleError } from '../errors/handleError.js';

export interface TaskState {
    tasks: ITasks[] | null;
    task: ITasks | null;

    getTask: (id: string) => Promise<ITasks | null>;
    setTask: (task: ITasks) => void;
    setTaks: (tasks: ITasks[]) => void;

    // Actions

    loadTask: (tabId: string) => Promise<void>;
    refreshCurrentTask: (tabId: string) => Promise<void>;

    fixChecked: (
        id: string,
        tabId: string,
        isCompleted: boolean
    ) => Promise<void>;
    undoLocalStatus: (id: string) => void;
    optimisticToggleChecked: (id: string) => void;
    optimisticToggleStarred: (id: string) => void;
    // resetOnTabChange: (newTabId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
    tasks: null,
    task: null,

    getTask: async (id: string) => {
        const { tasks } = get();
        return tasks?.find((task) => task.id === id) || null;
    },

    setTask: (task) => {
        set({ task });
    },

    setTaks: (v) => {
        const { tasks } = get();
        const map = new Map<string, ITasks>();

        tasks?.forEach((t) => map.set(t.id, t));
        v.forEach((t) => map.set(t.id, t));

        set({ tasks: Array.from(map.values()) });
    },

    // Load task list for specific tab
    loadTask: async (tabId) => {
        // try {
        // const currentState = get();

        const data = await getTasksByTabId(tabId);
        console.log({ Tasks: data });
        set({ tasks: data });
        // } catch (err) {
        //     handleError(err);
        // }
    },

    refreshCurrentTask: async (tabId) => {
        try {
            const data = await getTasksByTabId(tabId);
            // console.log('Force refreshing task:', currentTabId);
            set({ tasks: data });
        } catch (err) {
            handleError(err);
        }
    },

    // Commit changes to localStorage
    fixChecked: async (id, tabId, isCompleted) => {
        try {
            await updateTask(id, { isCompleted });
        } catch (err) {
            get().undoLocalStatus(id);
            handleError(err);
        }
    },

    // Undo local UI changes
    undoLocalStatus: (id) => {
        const { tasks } = get();
        set({
            tasks:
                tasks?.map((t: any) =>
                    t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
                ) || null,
        });
    },

    // Optimistic UI update
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

    // // Reset state when changing tabs with active toasts
    // resetOnTabChange: async (newTabId) => {
    //     try {
    //         const { stackedToast, currentTabId, resetToast, clearAllPending } =
    //             get();

    //         // Skip jika tab tidak berubah
    //         if (currentTabId === newTabId) {
    //             console.log('Same tab, skipping reset');
    //             return;
    //         }

    //         if (stackedToast > 0) {
    //             console.log('Tab changed with active toasts, resetting...');
    //             resetToast();
    //             clearAllPending();
    //         }

    //         // Load fresh data for new tab
    //         const data = await getTaskTabWithTasks(newTabId);
    //         set({ tasks: data, currentTabId: newTabId, error: null });
    //     } catch (err) {
    //         get().setError(err);
    //     }
    // },
}));
