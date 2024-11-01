const taskStatus = ['todo', 'inProgress', 'done'];

let tasks = [];

function addTask(description, status = 'todo') {
    if (typeof description !== 'string' || typeof status !== 'string') {
        throw new Error('INVALID_ARGUMENT');
    }
    if (!taskStatus.includes(status)) {
        throw new Error('INVALID_STATUS');
    }

    const id = tasks.length + 1;
    tasks.push({ id, description, status });
}

function deleteTask(id) {
    if (typeof id !== 'number') {
        throw new Error('INVALID_ARGUMENT');
    }

    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        return true;
    }
    return false;
}

function changeStatus(id, status) {
    if (typeof id !== 'number' || typeof status !== 'string') {
        throw new Error('INVALID_ARGUMENT');
    }
    if (!taskStatus.includes(status)) {
        throw new Error('INVALID_STATUS');
    }

    const task = tasks.find(task => task.id === id);
    if (task && task.status !== status) {
        task.status = status;
        return true;
    }
    return false;
}

function showList() {
    const list = {
        todo: [],
        inProgress: [],
        done: []
    };

    tasks.forEach(task => {
        list[task.status].push(`${task.id} "${task.description}"`);
    });

    console.log('Todo:');
    list.todo.forEach(task => console.log(`  ${task}`));
    console.log('In Progress:');
    list.inProgress.forEach(task => console.log(`  ${task}`));
    console.log('Done:');
    list.done.forEach(task => console.log(`  ${task}`));
}

// Пример использования
addTask('create a task');
addTask('make a bed');
addTask('write a post', 'inProgress');
changeStatus(1, 'done');
deleteTask(2);
showList();