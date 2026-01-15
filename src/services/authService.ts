import { api, ensureBase } from './api.js';

export async function putAccessToken(token: string) {
    return localStorage.setItem('accessToken', token);
}

export async function loginUser({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    ensureBase();
    const url = '/auth/login';
    const res = await api.post(
        url,
        { email, password }
        // { withCredentials: false }
    );

    const resData = res?.data;

    const token: string | null =
        resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
            ? resData.data?.accessToken
            : null;
    if (token) {
        putAccessToken(token);
        return true;
    }

    return false;
}

export async function logoutUser() {
    ensureBase();
    const url = '/auth/logout';
    const res = await api.delete(url);
    if (res?.status === 204) {
        return true;
    }
    return false;
}

export async function getLoggedUser() {
    const url = '/auth/me';
    const res = await api.get(url);

    const resData = res?.data;

    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : null;
}

export async function signUpUser({
    username,
    email,
    password,
    repeatPassword,
}: {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}) {
    const url = '/users/signup';
    const res = await api.post(
        url,
        {
            username,
            email,
            password,
            repeatPassword,
        },
        // { withCredentials: false }
    );

    const resData = res?.data;

    return resData && typeof resData === 'object' ? resData : null;
}

export async function verifyOTPUser({
    email,
    otp,
}: {
    email: string;
    otp: string;
}) {
    const url = '/users/verify-signup';
    const res = await api.post(url, { email, otp });

    const resData = res?.data;

    return resData && resData === 'object' ? resData : null;
}
