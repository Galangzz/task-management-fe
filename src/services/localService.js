const task = [
    {
        id: 'main-task',
        title: 'Tugas Saya',
        task: [
            {
                name: 'Matematika',
                dateDeadline: '2025-11-05T05:13:45.673Z',
            },
            {
                name: 'Bahasa Indonesia',
                dateDeadline: '2025-11-05T05:13:45.673Z',
            },
            {
                name: 'Bahasa Jawa',
                dateDeadline: '2025-11-07T05:13:45.673Z',
            },
        ],
    },
    {
        id: 123,
        title: 'ABcD',
        task: [
            {
                name: 'Matematika',
                dateDeadline: '2025-11-05T05:13:45.673Z',
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

    task.push({
        id: id,
        title: title,
    });

    return true;
}

function getTaskListByTitle(title) {
    if (!title) {
        return null;
    }

    const found = task.find((t) => t.title == title);

    return found || null;
}

function getTaskListById(id) {
    if (!id) {
        return task.find((t) => t.id == 'main-task');
    }

    const found = task.find((t) => t.id == id);

    return found || null;
}

function getAllTasks() {
    return task;
}

export { postTask, getTaskListByTitle, getAllTasks, getTaskListById };
