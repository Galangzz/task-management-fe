import { api, ensureBase } from './api';

export async function getTaskTabs() {
    ensureBase();

    const url = '/task-tabs';
    const res = await api.get(url, {
        withCredentials: false,
    });
    const resData = res?.data;
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : resData;
}
export async function addTaskTabTitle({ title }) {
    ensureBase();

    try {
        if (!title || title.trim() === '') {
            return { id: null, err: 'Judul tidak boleh kosong' };
        }
        const url = '/task-tabs';
        const res = await api.post(
            url,
            {
                name: title,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: false,
            }
        );

        const resData = res?.data;
        const id =
            resData &&
            typeof resData === 'object' &&
            Object.prototype.hasOwnProperty.call(resData, 'data')
                ? resData.data?.id
                : null;
        return { id: id, err: null };
    } catch (error) {
        console.error(error);
        return { id: null, err: error.message };
    }
}

export async function getTaskTabWithTasks(id = 'main-task') {
    ensureBase();

    const url = `/task-tabs/${id}`;
    const res = await api.get(url, {
        withCredentials: false,
    });
    console.log('FULL RES:', res);

    const resData = res?.data;
    console.log('DATA:', resData);
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : resData;
}

export async function getTaskTabById(id) {
    ensureBase();
    const url = `/task-tabs/tab/${id}`;
    const res = await api.get(url, {
        withCredentials: false,
    });
    const resData = res?.data;
    console.log({ resData });
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data?.id
        : null;
}
