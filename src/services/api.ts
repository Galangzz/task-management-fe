import axios from 'axios';
import ApiError from '../errors/ApiError.js';
import { useUserStore } from '../stores/useUserStore.js';
import { useTaskStore } from '../stores/useTaskStore.js';
import { useTabsStore } from '../stores/useTabStore.js';

const API_BASE: string = import.meta.env.VITE_API_URL;

const setUser = useUserStore.getState().setUser;
const resetTaskStore = useTaskStore.getState().resetTaskStore;
const resetTabStore = useTabsStore.getState().resetTabStore;

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        console.error({ api: error });

        if (!error.response) {
            return Promise.reject(
                new ApiError('Server tidak dapat dihubungi', 500)
            );
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;

            try {
                const url = '/auth/refresh';
                const response = await api.get(url);

                const { accessToken: newAccessToken } = response?.data?.data;

                localStorage.setItem('accessToken', newAccessToken);

                originalRequest.headers['Authorization'] =
                    `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                setUser(null);
                resetTaskStore();
                resetTabStore();
                return Promise.reject(refreshError);
            }
        }

        const data = error.response.data;

        const errorDetail = Array.isArray(data?.errors)
            ? data.errors[0]?.message
            : data?.errors || null;

        return Promise.reject(
            new ApiError(
                error.response.data?.message || 'Terjadi kesalahan',
                error.response.status,
                errorDetail
            )
        );
    }
);

export const publicApi = axios.create({
    baseURL: API_BASE,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

publicApi.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error({ publicApi: error });

        let errorDetail;
        let message;

        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 429) {
                const retryAfter = error.response?.headers['retry-after'];

                message =
                    error.response?.data ||
                    `Terlalu banyak request. Coba lagi${
                        retryAfter ? ` dalam ${retryAfter} detik` : ''
                    }`;
            } else {
                const data = error.response?.data;
                message = data?.message || 'Terjadi kesalahan';
                errorDetail = Array.isArray(data?.errors)
                    ? data.errors[0]?.message
                    : data?.errors || null;
            }
        }

        return Promise.reject(
            new ApiError(
                message || 'Terjadi kesalahan',
                error.response?.status,
                errorDetail
            )
        );
    }
);

export function ensureBase() {
    if (!API_BASE) {
        throw new Error('VITE_API_BASE belum dikonfigurasi. Set di .env');
    }
}
