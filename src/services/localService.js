import { nanoid } from 'nanoid';

let task = [
    {
        id: 'main-task',
        title: 'Tugas Saya',
        tasks: [
            {
                id: 1,
                name: 'Matematika',
                dateDeadline: '2025-11-05T05:13:45.673Z',
                created: '2025-11-05T05:13:45.673Z',
                stared: true,
                status: true,
            },
            {
                id: 2,
                name: 'Bahasa Indonesia',
                dateDeadline: '2025-11-05T05:13:45.673Z',
                created: '2025-11-05T05:13:45.673Z',
                stared: true,
                status: false,
            },
            {
                id: 3,
                name: 'Bahasa Jawa',
                dateDeadline: '2025-11-07T05:13:45.673Z',
                created: '2025-11-07T05:13:45.673Z',
                stared: false,
                status: false,
            },
        ],
    },
    {
        id: 123,
        title: 'ABcD',
        tasks: [
            {
                id: 4,
                name: 'Matematika',
                dateDeadline: '2025-11-21T05:13:45.673Z',
                created: '2025-11-21T05:13:45.673Z',
                stared: true,
                status: false,
            },
        ],
    },
];

function postTask({ id, title }) {
    if (id == null) {
        return false;
    }
    if (title == null) {
        return false;
    }

    const taskStorage = localStorage.getItem('task');

    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];

    tasks.push({
        id: id,
        title: title,
        tasks: [],
    });
    console.log({ tasks });
    localStorage.setItem('task', JSON.stringify(tasks));

    return true;
}

async function addNewTask(idList, { name, dateDeadline, detail, stared, status }) {
    // validasi input
    // if (!name || !idList) {
    //     console.error('idList dan name wajib diisi');
    //     return {err: ''};
    // }

    const taskStorage = localStorage.getItem('task');

    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];

    // cari list berdasarkan idList
    const listIndex = tasks.findIndex((list) => list.id === idList);
    if (listIndex === -1) {
        console.error(`List dengan id ${idList} tidak ditemukan.`);
        return { err: 'Gagal Menambahkan catatan' };
    }

    // buat id unik baru (auto increment berdasarkan semua task)
    // const allTasks = task.flatMap((list) => list.tasks);
    // const newId = allTasks.length ? Math.max(...allTasks.map((t) => t.id)) + 1 : 1;
    const newId = `task-${nanoid(16)}`;

    // waktu pembuatan (jika tidak dikirim dari luar)
    const created = new Date().toISOString();

    // task baru
    const newTask = {
        id: newId,
        name,
        detail,
        dateDeadline: dateDeadline ? new Date(dateDeadline).toISOString() : null,
        created,
        stared,
        status,
    };

    // tambahkan ke list yang sesuai
    tasks[listIndex].tasks.push(newTask);

    // simpan ke localStorage (opsional)
    localStorage.setItem('task', JSON.stringify(tasks));

    console.log('✅ Task baru ditambahkan:', newTask);
    console.log('📦 Semua data:', tasks);

    return { err: '' };
}

function getTaskListByTitle(title) {
    if (!title) {
        return null;
    }
    const taskStorage = localStorage.getItem('task');

    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];

    let found;
    try {
        found = tasks.find((t) => t.title == title);
    } catch {
        found = tasks.find((t) => t.title == title);
    }

    return found || null;
}

function getTaskListById(id) {
    const taskStorage = localStorage.getItem('task');
    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];
    console.log({tasks})

    if (!id) {
        return tasks.find((t) => t.id == 'main-task');
    }

    if (id == 'stared-task') {
        const staredTasks = tasks.flatMap((list) => list.tasks.filter((t) => t.stared === true) || []);
        return {
            id: 'stared-task',
            title: 'Stared Task',
            tasks: staredTasks,
        };
    }

    const found = tasks.find((t) => t.id == id);

    return found || null;
}

function getAllTasks() {
    const taskStorage = localStorage.getItem('task');
    if (taskStorage) {
        return JSON.parse(taskStorage);
    }
    return task;
}

function toggleStatusTask(id) {
    const taskStorage = localStorage.getItem('task');
    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];
    tasks = tasks.map((taskDoc) => ({
        ...taskDoc,
        tasks: taskDoc.tasks.map((taskItem) =>
            taskItem.id === id ? { ...taskItem, status: !taskItem.status } : taskItem
        ),
    }));

    localStorage.setItem('task', JSON.stringify(tasks));
}

function toggleStaredTask(id) {
    const taskStorage = localStorage.getItem('task');
    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];
    tasks = tasks.map((taskDoc) => ({
        ...taskDoc,
        tasks: taskDoc.tasks.map((taskItem) =>
            taskItem.id === id ? { ...taskItem, stared: !taskItem.stared } : taskItem
        ),
    }));
    localStorage.setItem('task', JSON.stringify(tasks));
}

export { postTask, getTaskListByTitle, getAllTasks, getTaskListById, toggleStatusTask, toggleStaredTask, addNewTask };
// {
//     const updateTaskArr = taskDoc.tasks.map((taskItem) => {
//         if (taskItem.id === id) {
//             return {
//                 ...taskItem,
//                 status: !taskItem.status,
//             };
//         }
//         return taskItem;
//     });
//     return {
//         ...taskDoc,
//         tasks: updateTaskArr,
//     };
// }
