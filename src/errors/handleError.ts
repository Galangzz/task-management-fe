import useToast from '../hooks/useToast.js';
import ApiError from './ApiError.js';

const toast = useToast();

export function handleError(err: unknown) {
    if (err instanceof ApiError) {
        toast.error(err);
        return;
    }

    if (err instanceof Error) {
        toast.error(err);
        return;
    }

    toast.error(new Error('Terjadi kesalahan'));
}
