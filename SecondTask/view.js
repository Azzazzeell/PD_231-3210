const View = {
    renderTask(task) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.setAttribute('data-id', task.id); // Добавляем атрибут data-id
        taskElement.innerHTML = `
            <div class="complete-task" data-id="${task.id}"></div>
            <div class="task-text">${task.text}</div>
            <div class="delete-task" data-id="${task.id}">✖</div>
        `;

        if (task.completed) {
            taskElement.querySelector('.complete-task').classList.add('completed');
        }

        document.querySelector(`.task-list.${task.priority.toLowerCase()}`).appendChild(taskElement);
    },

    clearInput(priority) {
        document.getElementById(`new-task-${priority.toLowerCase()}`).value = '';
    },

    bindAddTask(handler) {
        document.querySelectorAll('.add-task-btn').forEach(button => {
            button.addEventListener('click', () => {
                const priority = button.getAttribute('data-priority');
                const input = document.getElementById(`new-task-${priority.toLowerCase()}`);
                if (input.value.trim()) {
                    handler(input.value.trim(), priority);
                }
            });
        });
    },

    bindDeleteTask(handler) {
        document.querySelectorAll('.task-list').forEach(list => {
            list.addEventListener('click', (event) => {
                if (event.target.classList.contains('delete-task')) {
                    const id = event.target.getAttribute('data-id');
                    handler(id);
                }
            });
        });
    },

    bindCompleteTask(handler) {
        document.querySelectorAll('.task-list').forEach(list => {
            list.addEventListener('click', (event) => {
                if (event.target.classList.contains('complete-task')) {
                    const id = event.target.getAttribute('data-id');
                    handler(id);
                }
            });
        });
    }
};

export default View;