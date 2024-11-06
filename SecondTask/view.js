const View = {
    renderTask(task) {
        const taskElement = document.createElement('li');
        taskElement.className = 'task';
        taskElement.setAttribute('data-id', task.id);
        taskElement.innerHTML = `
            <div class="complete-task" data-id="${task.id}"></div>
            <div class="task-text">
                <input type="text" value="${task.text}" data-id="${task.id}" class="edit-task-input" readonly>
                <button class="delete-task" data-id="${task.id}"></button>
            </div>
        `;

        if (task.completed) {
            taskElement.querySelector('.complete-task').classList.add('completed');
        }

        document.querySelector(`.task-list.${task.priority.toLowerCase()}`).appendChild(taskElement);
    },

    clearInput(priority) {
        const input = document.getElementById(`new-task-${priority.toLowerCase()}`);
        input.value = '';
        input.placeholder = priority === 'HIGH' ? 'Добавить важных дел' : 'Добавить неважных дел';
    },

    bindAddTask(handler) {
        document.querySelectorAll('.add-task-input').forEach(input => {
            input.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const priority = input.getAttribute('data-priority');
                    if (input.value.trim()) {
                        handler(input.value.trim(), priority);
                    }
                }
            });
        });

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
    },

    removeTask(id) {
        document.querySelector(`.task[data-id="${id}"]`).remove();
    },

    toggleCompleteTask(id, completed) {
        const taskElement = document.querySelector(`.task[data-id="${id}"] .complete-task`);
        taskElement.classList.toggle('completed', completed);
    }
};

export default View;