import axios from 'axios';
import ApiError from '../errors/ApiError.js';

const API_BASE: string = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        console.error(error);

        if (!error.response) {
            return Promise.reject(
                new ApiError('Server tidak dapat dihubungi', 500)
            );
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

export function ensureBase() {
    if (!API_BASE) {
        throw new Error('VITE_API_BASE belum dikonfigurasi. Set di .env');
    }
}
