import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: API_BASE,
    headers: {
        Accept: 'application/json',
    },
});

export function ensureBase() {
    if (!API_BASE) {
        throw new Error(
            'VITE_API_BASE belum dikonfigurasi. Set di front-end/.env'
        );
    }
}
