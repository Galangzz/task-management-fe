const task = [
    {
        id: 123,
        title: 'ABcD',
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
        return null;
    }

    const found = task.find((t) => t.id == id);

    return found || null;
}

function getAllTasks() {
    return task;
}

export { postTask, getTaskListByTitle, getAllTasks, getTaskListById };
