let task = [
    {
        id: 'main-task',
        title: 'Tugas Saya',
        tasks: [
            {
                id: 1,
                name: 'Matematika',
                dateDeadline: '2025-11-05T05:13:45.673Z',
                stared: true,
                status: true,
            },
            {
                id: 2,
                name: 'Bahasa Indonesia',
                dateDeadline: '2025-11-05T05:13:45.673Z',
                stared: true,
                status: false,
            },
            {
                id: 3,
                name: 'Bahasa Jawa',
                dateDeadline: '2025-11-07T05:13:45.673Z',
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

    task.push({
        id: id,
        title: title,
        tasks: [],
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

    if (id == 'stared-task') {
        const staredTasks = task.flatMap((list) => list.tasks.filter((t) => t.stared === true) || []);
        return {
            id: 'stared-task',
            title: 'Stared Task',
            tasks: staredTasks,
        };
    }

    const found = task.find((t) => t.id == id);

    return found || null;
}

function getAllTasks() {
    return task;
}

function toggleStatusTask(id) {
    task = task.map((taskDoc) => ({
        ...taskDoc,
        tasks: taskDoc.tasks.map((taskItem) =>
            taskItem.id === id ? { ...taskItem, status: !taskItem.status } : taskItem
        ),
    }));
}

function toggleStaredTask(id) {
    task = task.map((taskDoc) => ({
        ...taskDoc,
        tasks: taskDoc.tasks.map((taskItem) =>
            taskItem.id === id ? { ...taskItem, stared: !taskItem.stared } : taskItem
        ),
    }));
}

export { postTask, getTaskListByTitle, getAllTasks, getTaskListById, toggleStatusTask, toggleStaredTask };
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
