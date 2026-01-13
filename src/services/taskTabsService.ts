import type { ITab } from '../types/tabTypes.js';
import { api, ensureBase } from './api.js';

export async function getTabs(): Promise<ITab[] | null> {
    ensureBase();
    const url = '/task-tabs';
    const res = await api.get(url);
    const resData = res?.data;
    return resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
        ? resData.data
        : null;
}

export async function addNewTabTitle({
    title,
}: {
    title: string;
}): Promise<ITab> {
    ensureBase();

    //TODO: Validation shouldn't be here
    if (!title || title.trim() === '') {
        throw new Error('Judul tidak boleh kosong');
    }
    const url = '/task-tabs';
    const res = await api.post(url, {
        name: title,
    });

    const resData = res?.data;
    const data =
        resData &&
        typeof resData === 'object' &&
        Object.prototype.hasOwnProperty.call(resData, 'data')
            ? (resData.data as ITab)
            : null;
    if (!data) {
        throw new Error('Gagal menambahkan tab');
    }
    const { id, name, createdAt, deletePermission } = data;

    return { id, name, createdAt, deletePermission };
}

// export async function getTaskTabWithTasks(id = 'main-task') {
//     ensureBase();

//     const url = `/task-tabs/${id}`;
//     const res = await api.get(url);
//     console.log('FULL RES:', res);

//     const resData = res?.data;
//     console.log('DATA:', resData);
//     return resData &&
//         typeof resData === 'object' &&
//         Object.prototype.hasOwnProperty.call(resData, 'data')
//         ? resData.data
//         : resData;
// }

export async function getTabById(id: string): Promise<string | null> {
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
