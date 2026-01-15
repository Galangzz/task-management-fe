import { create } from 'zustand';
import type { IUser } from '../types/userTypes.js';
import { getLoggedUser, logoutUser } from '../services/authService.js';

type UserState = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    checkUserLogged: (mounted?: boolean) => Promise<void>;
    handleLogout: () => Promise<void>;
};

export const useUserStore = create<UserState>((set, get) => ({
    user: null,

    setUser: (user) => set({ user }),

    checkUserLogged: async (mounted) => {
        const { setUser } = get();
        try {
            const res = await getLoggedUser();
            if (!res) {
                setUser(null);
                return;
            }
            const { id, username, email } = res;
            if (!mounted) return;
            setUser({
                id,
                username,
                email,
            });
        } catch {
            setUser(null);
        }
    },

    handleLogout: async() => {
        const { setUser } = get();
        await logoutUser();
        setUser(null);
    }
}));
