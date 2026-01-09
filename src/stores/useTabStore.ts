import { create } from 'zustand';
import type { ITab, ITask } from '../types/index.js';
import { getTaskTabs } from '../services/taskTabsService.js';
import { handleError } from '../errors/handleError.js';

interface TabsStoreState {
    tabs: ITab[] | null;
    tab: ITab | null;
    currentTabId: string;
    pendingUpdates: Map<string, ITask[] | null>;

    setTabs: () => Promise<void>;
    setTab: (tabId: string) => void;
    setCurrentTabId: (tabId: string) => void;

    optimisticAddTab: (tab: ITab) => void;

    addPendingUpdates: (tabId: string, tasks: ITask) => void;
    clearPendingUpdates: (tabId: string, taskId: string) => void;
    clearAllPendingUpdates: () => void;
}

export const useTabsStore = create<TabsStoreState>((set, get) => ({
    tabs: null,
    tab: null,
    currentTabId: '',
    pendingUpdates: new Map(),

    setTabs: async () => {
        try {
            const tabs = await getTaskTabs();
            console.log({ tabs });
            set({ tabs });
        } catch (err) {
            handleError(err);
        }
    },

    setTab: (tabId) => {
        set({ tab: get().tabs?.find((tab) => tab.id === tabId) || null });
    },

    setCurrentTabId: (tabId) => set({ currentTabId: tabId }),

    optimisticAddTab: (tab) => {
        const tabs = get().tabs || [];
        console.log('OptimisticAddTab Trigerred..');
        tabs.push(tab);
        set({ tabs: tabs });
        console.log({ tab });
        console.log({ Optimistic: tabs });
    },

    addPendingUpdates: (tabId, tasks) => {
        const pending = new Map(get().pendingUpdates);
        const taskPending = pending.get(tabId) || [];
        pending.set(tabId, [...taskPending, tasks]);
        set({ pendingUpdates: pending });
    },

    clearPendingUpdates: (tabId, taskId) => {
        const pending = new Map(get().pendingUpdates);
        const taskPending = pending.get(tabId) || [];
        const newTaskPending = taskPending.filter((task) => task.id !== taskId);
        if (newTaskPending.length === 0) {
            pending.delete(tabId);
        } else {
            pending.set(tabId, newTaskPending);
        }
        set({ pendingUpdates: pending });
    },

    clearAllPendingUpdates: () => set({ pendingUpdates: new Map() }),
}));
