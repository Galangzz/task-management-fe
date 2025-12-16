import { create } from 'zustand';
// import { toggleStatusTask } from '../services/localService';
import { getTaskTabs, getTaskTabWithTasks } from '../services/taskTabsService';
import { updateTask } from '../services/tasksService';

export const useTaskStore = create((set, get) => ({
    tabs: null,
    currentTabId: 'main-task',
    task: null,
    pendingUpdates: new Map(),
    stackedToast: 0,

    // Set current tab ID
    setCurrentTabId: (tabId) => set({ currentTabId: tabId }),

    // Refresh tabs list
    setTabs: async () => set({ tabs: await getTaskTabs() }),

    // Load task list for specific tab
    loadTaskList: async (tabId) => {
        const currentState = get();
        // Hanya update jika data benar-benar berbeda
        if (currentState.task?.id === tabId) {
            console.log('Task already loaded for', tabId);
            return;
        }

        const data = await getTaskTabWithTasks(tabId);
        set({ task: data, currentTabId: tabId });
    },

    refreshCurrentTask: async () => {
        const { currentTabId } = get();
        const data = await getTaskTabWithTasks(currentTabId);
        console.log('Force refreshing task:', currentTabId);
        set({ task: data });
    },

    // Toast counter management
    increaseToast: () =>
        set((state) => ({ stackedToast: state.stackedToast + 1 })),

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
    fixChecked: async (id, tabId, isCompleted) => {
        await updateTask(id, { isCompleted });
        get().addPending(tabId);
    },

    // Undo local UI changes
    undoLocalStatus: (id) =>
        set((state) => ({
            task: {
                ...state.task,
                tasks: state.task.tasks.map((t) =>
                    t.id === id ? { ...t, isCompleted: 1 - t.isCompleted } : t
                ),
            },
        })),

    // Optimistic UI update
    optimisticToggleChecked: async (id) =>
        set((state) => ({
            task: {
                ...state.task,
                tasks: state.task.tasks.map((t) =>
                    t.id === id ? { ...t, isCompleted: 1 - t.isCompleted } : t
                ),
            },
        })),

    optimisticToggleStarred: async (id) =>
        set((state) => ({
            task: {
                ...state.task,
                tasks: state.task.tasks.map((t) =>
                    t.id === id ? { ...t, starred: 1 - t.starred } : t
                ),
            },
        })),

    // Refresh pending tabs when toast count reaches 0
    refreshPendingTabs: () => {
        const { pendingUpdates, loadTaskList, currentTabId, clearAllPending } =
            get();

        if (pendingUpdates.size > 0) {
            console.log(
                'Refreshing pending tabs:',
                Array.from(pendingUpdates.keys())
            );

            // Hanya refresh tab yang sedang aktif
            if (pendingUpdates.has(currentTabId)) {
                loadTaskList(currentTabId);
            }

            clearAllPending();
        }
    },

    // Reset state when changing tabs with active toasts
    resetOnTabChange: async (newTabId) => {
        const { stackedToast, currentTabId, resetToast, clearAllPending } =
            get();

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
        const data = await getTaskTabWithTasks(newTabId);
        set({ task: data, currentTabId: newTabId });
    },
}));
