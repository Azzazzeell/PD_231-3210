const View = {
    renderTask(task) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.setAttribute('data-id', task.id); // Добавляем атрибут data-id
        taskElement.innerHTML = `
            <div class="complete-task" data-id="${task.id}"></div>
            <div class="task-text">${task.text}</div>
            <div class="task-priority">${task.priority}</div>
            <div class="delete-task" data-id="${task.id}">✖</div>
        `;

        if (task.completed) {
            taskElement.querySelector('.complete-task').classList.add('completed');
        }

        document.querySelector('.task-list').appendChild(taskElement);
    },

    clearInput() {
        document.getElementById('new-task').value = '';
    },

    bindAddTask(handler) {
        document.getElementById('add-task-btn').addEventListener('click', () => {
            const input = document.getElementById('new-task');
            if (input.value.trim()) {
                handler(input.value.trim());
            }
        });
    },

    bindDeleteTask(handler) {
        document.querySelector('.task-list').addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-task')) {
                const id = event.target.getAttribute('data-id');
                handler(id);
            }
        });
    },

    bindCompleteTask(handler) {
        document.querySelector('.task-list').addEventListener('click', (event) => {
            if (event.target.classList.contains('complete-task')) {
                const id = event.target.getAttribute('data-id');
                handler(id);
            }
        });
    }
};

export default View;