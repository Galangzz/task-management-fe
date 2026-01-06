import axios, { AxiosError } from 'axios';
import ApiError from '../errors/ApiError.js';

const API_BASE: string = import.meta.env.VITE_API_URL;

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
                cookieStore.delete('jwt');
                // window.location.href = '/';
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
});

publicApi.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error({ publicApi: error });
        const data = error.response?.data;
        const errorDetail = Array.isArray(data?.errors)
            ? data.errors[0]?.message
            : data?.errors || null;
        return Promise.reject(
            new ApiError(
                error.response?.data?.message || 'Terjadi kesalahan',
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
