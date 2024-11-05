import View from './view.js';

let tasks = [];
let taskId = 0;

const addTask = (text, priority) => {
    const newTask = {
        id: taskId++,
        text: text,
        completed: false,
        priority: priority
    };
    tasks.push(newTask);
    View.renderTask(newTask);
    View.clearInput(priority);
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id != id);
    View.removeTask(id);
};

const completeTask = (id) => {
    const task = tasks.find(task => task.id == id);
    task.completed = !task.completed;
    View.toggleCompleteTask(id, task.completed);
};

const editTask = (id, newText) => {
    const task = tasks.find(task => task.id == id);
    if (task) {
        task.text = newText;
    }
};

View.bindAddTask(addTask);
View.bindDeleteTask(deleteTask);
View.bindCompleteTask(completeTask);
View.bindEditTask(editTask);