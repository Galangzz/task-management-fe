import { create } from 'zustand';
import type { ITab, ITask } from '../types/index.js';
import { getTabs } from '../services/taskTabsService.js';
import { handleError } from '../errors/handleError.js';

interface TabsStoreState {
    tabs: ITab[] | null;
    tab: ITab | null;
    currentTabId: string;
    previousTabId: string;
    pendingUpdates: Map<string, ITask[] | null>;

    setTabs: () => Promise<void>;
    setTab: (tabId: string) => void;
    setCurrentTabId: (tabId: string) => void;
    setPreviousTabId: (tabId: string) => void;

    optimisticAddTab: (tab: ITab) => void;
    optimisticDeleteTab: (tabId: string) => void;

    addPendingUpdates: (tabId: string, tasks: ITask) => void;
    clearPendingUpdates: (tabId: string, taskId: string) => void;
    clearAllPendingUpdates: () => void;
    resetTabStore: () => void;
}

export const useTabsStore = create<TabsStoreState>((set, get) => ({
    tabs: null,
    tab: null,
    currentTabId: '',
    previousTabId: '',
    pendingUpdates: new Map(),

    setTabs: async () => {
        try {
            const tabs = await getTabs();
            console.log({ tabs });
            set({ tabs });
        } catch (err) {
            handleError(err);
        }
    },

    setTab: (tabId) => {
        if (tabId === 'starred-task') {
            set({
                tab: {
                    id: 'starred-task',
                    name: 'Starred Task',
                    createdAt: new Date(),
                    deletePermission: false,
                },
            });
            return;
        }
        set({ tab: get().tabs?.find((tab) => tab.id === tabId) || null });
    },

    setCurrentTabId: (tabId) => set({ currentTabId: tabId }),

    setPreviousTabId: (tabId) => set({ previousTabId: tabId }),

    optimisticAddTab: (tab) => {
        const tabs = get().tabs || [];
        console.log('OptimisticAddTab Trigerred..');
        tabs.push(tab);
        set({ tabs: tabs });
        console.log({ tab });
        console.log({ Optimistic: tabs });
    },

    optimisticDeleteTab: (tabId) => {
        const tabs = get().tabs || [];
        const newTabs = tabs.filter((tab) => tab.id !== tabId);
        set({ tabs: newTabs });
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

    resetTabStore: () => {
        const { clearAllPendingUpdates } = get();
        clearAllPendingUpdates();
        console.log('Reset TabStore');
        set({ tabs: null, tab: null, currentTabId: '', previousTabId: '' });
    },
}));
