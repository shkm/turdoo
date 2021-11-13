const LOCAL_STORAGE_KEY = 'tasks'

export function saveTask(task) {
  const tasks = [...savedTasks(), task]

  updateTasks(tasks)
}

export function unsaveTask(id) {
  const tasks = savedTasks().filter(task => task.id !== id)

  updateTasks(tasks)
}

export function savedTasks() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
}

function updateTasks(newTasks) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
}
