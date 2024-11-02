document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');

  addTaskBtn.addEventListener('click', () => {
    addTask();
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const priority = getPriority(taskText);
      const task = { text: taskText, priority: priority };
      View.addTask(task);
      taskInput.value = '';
    }
  }

  function getPriority(taskText) {
    // Логика определения приоритета
    if (taskText.includes('срочно')) {
      return 'high';
    } else if (taskText.includes('важно')) {
      return 'medium';
    } else {
      return 'low';
    }
  }
});