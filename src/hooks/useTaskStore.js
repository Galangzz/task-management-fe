import {create} from 'zustand'

export const useTaskStore = create((set) => ({
    tasks: [],
    pendingUpdates: {},

    setTasks: (tasks) => set({tasks}),

    
}))