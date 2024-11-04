import View from './view.js';

let tasks = [];
let taskId = 0;

const addTask = (text, priority) => {
    const newTask = {
        id: taskId++,
        text: text,
        completed: false,
        priority: priority // Используем выбранный приоритет
    };
    tasks.push(newTask);
    View.renderTask(newTask);
    View.clearInput(priority);
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id != id);
    document.querySelector(`.task[data-id="${id}"]`).remove();
};

const completeTask = (id) => {
    const task = tasks.find(task => task.id == id);
    task.completed = !task.completed;
    const taskElement = document.querySelector(`.task[data-id="${id}"] .complete-task`);
    taskElement.classList.toggle('completed', task.completed);
};

View.bindAddTask(addTask);
View.bindDeleteTask(deleteTask);
View.bindCompleteTask(completeTask);