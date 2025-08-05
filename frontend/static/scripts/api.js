const API = "http://127.0.0.1:8000";

export async function getAllTasks() {
  const res = await fetch(`${API}/getAllTask`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API}/createTask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTaskState(id, state) {
  return fetch(`${API}/changeStateTask/${state}/${id}`, { method: "PUT" });
}

export async function updateTaskPriority(id) {
  return fetch(`${API}/changePriorityTask/${id}`, { method: "PUT" });
}

export async function deleteTask(id) {
  return fetch(`${API}/deleteTask/${id}`, { method: "DELETE" });
}

export async function getTasksByPriority(name) {
  const res = await fetch(`${API}/getByPriority/${name}`);
  return res.json();
}

export async function getTasksByDate(name) {
  const res = await fetch(`${API}/getByDate/${name}`);
  return res.json();
}
