type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('taskForm') as HTMLFormElement;
  const taskInput = document.getElementById('taskInput') as HTMLInputElement;
  const prioritySelect = document.getElementById('prioritySelect') as HTMLSelectElement;
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
      priority: prioritySelect.value as Priority,
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
      tasksList.innerHTML = '<p class="text-center text-gray-400 text-sm py-8 px-4 m-0">No tasks yet. Add one above!</p>';
      return;
    }

    tasksList.innerHTML = tasks
      .map(task => `
        <div class="p-3 bg-white border border-gray-200 rounded-lg flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm animate-slideIn" data-id="${task.id}">
          <span class="flex-1 text-sm text-gray-700 break-words">${escapeHtml(task.text)}</span>
          <span class="px-2 py-0.5 text-xs font-medium rounded ${getPriorityClasses(task.priority)}">${task.priority}</span>
        </div>
      `)
      .join('');
  }

  function getPriorityClasses(priority: Priority): string {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
