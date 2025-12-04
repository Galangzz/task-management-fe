import { create } from 'zustand';
import { getAllTasks, getTaskListById, toggleStatusTask } from '../services/localService';

export const useTaskStore = create((set, get) => ({
    tabs: getAllTasks(),
    currentTabId: 'main-task',
    task: getTaskListById('main-task'),
    pendingUpdates: new Map(),
    stackedToast: 0,

    // Set current tab ID
    setCurrentTabId: (tabId) => set({ currentTabId: tabId }),

    // Refresh tabs list
    setTabs: () => set({ tabs: getAllTasks() }),

    // Load task list for specific tab
    loadTaskList: (tabId) => {
        const currentState = get();
        // Hanya update jika data benar-benar berbeda
        if (currentState.task?.id === tabId) {
            console.log('Task already loaded for', tabId);
            return;
        }

        const data = getTaskListById(tabId);
        set({ task: data, currentTabId: tabId });
    },

    refreshCurrentTask: () => {
        const { currentTabId } = get();
        const data = getTaskListById(currentTabId);
        console.log('Force refreshing task:', currentTabId);
        set({ task: data });
    },

    // Toast counter management
    increaseToast: () => set((state) => ({ stackedToast: state.stackedToast + 1 })),

    decreaseToast: () =>
        set((state) => ({
            stackedToast: Math.max(state.stackedToast - 1, 0),
        })),

    resetToast: () => set({ stackedToast: 0 }),

    // Pending updates management
    addPending: (tabId) => {
        const pending = new Map(get().pendingUpdates);
        pending.set(tabId, (pending.get(tabId) || 0) + 1);
        set({ pendingUpdates: pending });
    },

    clearPending: (tabId) => {
        const pending = new Map(get().pendingUpdates);
        pending.delete(tabId);
        set({ pendingUpdates: pending });
    },

    clearAllPending: () => set({ pendingUpdates: new Map() }),

    // Commit changes to localStorage
    fixChecked: async (id, tabId) => {
        await toggleStatusTask(id);
        get().addPending(tabId);
    },

    // Undo local UI changes
    undoLocalStatus: (id) =>
        set((state) => ({
            task: {
                ...state.task,
                tasks: state.task.tasks.map((t) => (t.id === id ? { ...t, status: !t.status } : t)),
            },
        })),

    // Optimistic UI update
    optimisticToggle: (id) =>
        set((state) => ({
            task: {
                ...state.task,
                tasks: state.task.tasks.map((t) => (t.id === id ? { ...t, status: !t.status } : t)),
            },
        })),

    // Refresh pending tabs when toast count reaches 0
    refreshPendingTabs: () => {
        const { pendingUpdates, loadTaskList, currentTabId, clearAllPending } = get();

        if (pendingUpdates.size > 0) {
            console.log('Refreshing pending tabs:', Array.from(pendingUpdates.keys()));

            // Hanya refresh tab yang sedang aktif
            if (pendingUpdates.has(currentTabId)) {
                loadTaskList(currentTabId);
            }

            clearAllPending();
        }
    },

    // Reset state when changing tabs with active toasts
    resetOnTabChange: (newTabId) => {
        const { stackedToast, currentTabId, resetToast, clearAllPending } = get();

        // Skip jika tab tidak berubah
        if (currentTabId === newTabId) {
            console.log('Same tab, skipping reset');
            return;
        }

        if (stackedToast > 0) {
            console.log('Tab changed with active toasts, resetting...');
            resetToast();
            clearAllPending();
        }

        // Load fresh data for new tab
        const data = getTaskListById(newTabId);
        set({ task: data, currentTabId: newTabId });
    },
}));
