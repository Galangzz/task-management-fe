import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

let task = [
    {
        id: 'main-task',
        title: 'Tugas Saya',
        tasks: [
            {
                id: '1',
                name: 'Matematika',
                dateDeadline: '2025-11-05T05:13:45.673Z',
                created: '2025-11-05T05:13:45.673Z',
                stared: true,
                status: true,
            },
            {
                id: '2',
                name: 'Bahasa Indonesia',
                dateDeadline: '2025-11-05T05:13:45.673Z',
                created: '2025-11-05T05:13:45.673Z',
                stared: true,
                status: false,
            },
            {
                id: '3',
                name: 'Bahasa Jawa',
                dateDeadline: '2025-11-07T05:13:45.673Z',
                created: '2025-11-07T05:13:45.673Z',
                stared: false,
                status: false,
            },
        ],
        deletePermission: false,
    },
    {
        id: 123,
        title: 'ABcD',
        tasks: [
            {
                id: '4',
                name: 'Matematika',
                dateDeadline: '2025-11-21T05:13:45.673Z',
                created: '2025-11-21T05:13:45.673Z',
                stared: true,
                status: false,
            },
        ],
        deletePermission: true,
    },
];

async function addTaskTitle({ title }) {
    try {
        if (!title || title.trim() === '') {
            return { id: null, err: 'Judul tidak boleh kosong' };
        }
        const checkDuplicate = getTaskListByTitle(title);
        if (checkDuplicate)
            return { id: null, err: 'Judul task list tidak boleh duplikat' };

        const id = nanoid(16);

        const taskStorage = localStorage.getItem('task');
        let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];

        tasks.push({
            id: id,
            title: title.trim(),
            tasks: [],
            deletePermission: true,
        });
        console.log({ tasks });
        localStorage.setItem('task', JSON.stringify(tasks));

        return { id: id, err: null };
    } catch (error) {
        console.error(error);
        return { id: null, err: error };
    }
}

async function addNewTask(
    idList,
    { name, dateDeadline, detail, stared, status }
) {
    const taskStorage = localStorage.getItem('task');

    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];

    const listIndex = tasks.findIndex((list) => list.id === idList);
    if (listIndex === -1) {
        console.error(`List dengan id ${idList} tidak ditemukan.`);
        return { err: 'Gagal Menambahkan catatan' };
    }

    const newId = `task-${nanoid(16)}`;

    const created = new Date().toISOString();

    const newTask = {
        id: newId,
        name,
        detail,
        dateDeadline: dateDeadline
            ? new Date(dateDeadline).toISOString()
            : null,
        created,
        stared,
        status,
    };

    tasks[listIndex].tasks.push(newTask);

    localStorage.setItem('task', JSON.stringify(tasks));

    console.log('Task baru ditambahkan:', newTask);
    console.log('Semua data:', tasks);

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
    console.log({ tasks });

    if (!id) {
        return tasks.find((t) => t.id == 'main-task');
    }

    if (id == 'stared-task') {
        const staredTasks = tasks.flatMap(
            (list) => list.tasks.filter((t) => t.stared === true) || []
        );
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

async function toggleStatusTask(id) {
    const taskStorage = localStorage.getItem('task');
    let tasks = taskStorage ? JSON.parse(taskStorage) : [...task];
    tasks = await tasks.map((taskDoc) => ({
        ...taskDoc,
        tasks: taskDoc.tasks.map((taskItem) =>
            taskItem.id === id
                ? { ...taskItem, status: !taskItem.status }
                : taskItem
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
            taskItem.id === id
                ? { ...taskItem, stared: !taskItem.stared }
                : taskItem
        ),
    }));
    localStorage.setItem('task', JSON.stringify(tasks));
}

export {
    addTaskTitle,
    getTaskListByTitle,
    getAllTasks,
    getTaskListById,
    toggleStatusTask,
    toggleStaredTask,
    addNewTask,
};

addTaskTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

addNewTask.propTypes = {
    idList: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dateDeadline: PropTypes.string,
    detail: PropTypes.string,
    stared: PropTypes.bool.isRequired,
    status: PropTypes.bool.isRequired,
};

getTaskListByTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

getTaskListById.propTypes = {
    id: PropTypes.string.isRequired,
};

toggleStatusTask.propTypes = {
    id: PropTypes.string.isRequired,
};
