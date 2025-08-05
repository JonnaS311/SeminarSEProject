import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTaskState,
  updateTaskPriority,
  getTasksByPriority,
  getTasksByDate,
} from "./api.js";

import {
  createTaskCard,
  clearTasks,
  appendTask,
  getTaskContainers,
} from "./dom.js";

export function setupFormSubmit() {
  document.getElementById("form").addEventListener("submit", async(event) => {
    event.preventDefault();
    const form = event.target;
    const datos = new FormData(form);

    const required = ["title", "date", "assignee", "description", "color"];
    for (const field of required) {
      const value = datos.get(field)?.trim();
      if (!value) {
        alert(`El campo "${field}" es obligatorio.`);
        return;
      }
    }

    const task = {
      task_id: null,
      title: datos.get("title"),
      date: new Date(datos.get("date")),
      description: datos.get("description"),
      assignee: datos.get("assignee"),
      color: datos.get("color"),
      priority: false,
      state: "todo",
      manager_id: 1,
    };

    const result = await createTask(task);
    const todoContainer = getTaskContainers().todo;
    const card = createTaskCard(result, handlers);
    appendTask(todoContainer, card);

    // limpiar los campos del formulario
    const inputs = document.getElementById("formu").querySelectorAll("input, textarea, select");
    inputs.forEach(input => {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      } else {
        input.value = "";
      }
    });

    document.getElementById("formu").close();
    Toastify({
      text: "Task added successfully",
      className: "info",
      gravity: "bottom",
      position: "left",
      close: true,
      style: {
        background: "var(--verde-hover)",
        border: "border: var(--texto-secundario) solid 2px",
        "box-shadow": "0px 5px 0px var(--texto-secundario)",
        "border-radius": "2rem",
      },
    }).showToast();
  });
}

export async function loadTasks() {
  const result = await getAllTasks();
  const containers = getTaskContainers();
  for (const task of result) {
    const card = createTaskCard(task, handlers);
    appendTask(containers[task.state], card);
  }
}

export async function filterBy(type, name) {
  const containers = getTaskContainers();
  const container = containers[name];
  clearTasks(container);

  const data = type === "priority"
    ? await getTasksByPriority(name)
    : await getTasksByDate(name);

  data.forEach(task => {
    const card = createTaskCard(task, handlers);
    appendTask(container, card);
  });
}

export const handlers = {
  onDelete: async(id) => {
    Notiflix.Confirm.show("Delete task",
      "Do you want delete this task?",
      "Yes",
      "No",
      async() => {
        await deleteTask(id);
        document.getElementById(id)?.remove();
        Toastify({
          text: "Task deleted successfully",
          className: "info",
          gravity: "bottom",
          position: "left",
          close: true,
          style: {
            background: "var(--verde-hover)",
            border: "border: var(--texto-secundario) solid 2px",
            "box-shadow": "0px 5px 0px var(--texto-secundario)",
            "border-radius": "2rem",
          },
        }).showToast();
      });
  },
  onMove: async(id) => {
    const task = document.getElementById(id);
    const current = task.parentNode.parentNode.id;
    const next = current === "todo" ? "doing" : "done";
    await updateTaskState(id, next);
    getTaskContainers()[next].appendChild(task);
  },
  onTogglePriority: async(id) => {
    await updateTaskPriority(id);
    const btn = document.getElementById(id).querySelector(".task-actions button");
    btn.classList.toggle("priority");
    btn.classList.toggle("star");
  },
};