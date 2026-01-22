import {api, ensureBase} from './api.js'


export async function addNotificationToken(token: string) {
    ensureBase();
    const url = '/notifications/token';
    await api.post(url, {
        token
    })
}