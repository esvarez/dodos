interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('taskForm') as HTMLFormElement;
  const taskInput = document.getElementById('taskInput') as HTMLInputElement;
  const tasksList = document.getElementById('tasksList') as HTMLDivElement;

  // Load tasks on startup
  loadTasks();

  // Handle form submission
  taskForm?.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    // Create new task
    const newTask: Task = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      createdAt: Date.now()
    };

    // Save task
    saveTasks(newTask);

    // Clear input
    taskInput.value = '';
  });

  function saveTasks(newTask: Task) {
    chrome.storage.local.get(['tasks'], function(result) {
      const tasks: Task[] = result.tasks || [];
      tasks.push(newTask);

      chrome.storage.local.set({ tasks }, function() {
        loadTasks();
      });
    });
  }

  function loadTasks() {
    chrome.storage.local.get(['tasks'], function(result) {
      const tasks: Task[] = result.tasks || [];
      renderTasks(tasks);
    });
  }

  function renderTasks(tasks: Task[]) {
    if (!tasksList) return;

    if (tasks.length === 0) {
      tasksList.innerHTML = '<p class="empty-state">No tasks yet. Add one above!</p>';
      return;
    }

    tasksList.innerHTML = tasks
      .map(task => `
        <div class="task-item" data-id="${task.id}">
          <span class="task-text">${escapeHtml(task.text)}</span>
        </div>
      `)
      .join('');
  }

  function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
