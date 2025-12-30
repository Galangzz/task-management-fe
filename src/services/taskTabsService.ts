import { api, ensureBase } from './api.js';

export async function getTaskTabs() {
    ensureBase();
    const url = '/task-tabs';
    const res = await api.get(url);
    const resData = res?.data;
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : resData;
}

export async function addTaskTabTitle({ title }: { title: string }) {
    ensureBase();

    if (!title || title.trim() === '') {
        throw new Error('Judul tidak boleh kosong');
    }
    const url = '/task-tabs';
    const res = await api.post(
        url,
        {
            name: title,
        },
    );

    const resData = res?.data;
    const id =
        resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
            ? resData.data?.id
            : null;
    return { id: id };
}

export async function getTaskTabWithTasks(id = 'main-task') {
    ensureBase();

    const url = `/task-tabs/${id}`;
    const res = await api.get(url);
    console.log('FULL RES:', res);

    const resData = res?.data;
    console.log('DATA:', resData);
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : resData;
}

export async function getTaskTabById(id: string) {
    ensureBase();
    const url = `/task-tabs/tab/${id}`;
    const res = await api.get(url);
    const resData = res?.data;
    console.log({ resData });
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data?.id
        : null;
}
