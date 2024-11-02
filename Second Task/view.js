const View = {
  addTask: function(task) {
    const listId = `${task.priority}PriorityList`;
    const list = document.getElementById(listId);
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="deleteBtn">X</button>
    `;
    list.appendChild(li);

    li.querySelector('.deleteBtn').addEventListener('click', () => {
      this.removeTask(li);
    });
  },

  removeTask: function(taskElement) {
    taskElement.remove();
  }
};