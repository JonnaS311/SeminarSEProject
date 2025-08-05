import { updateTaskState } from "./api.js";

interact(".task-card").draggable({
  listeners: {
    start(event) {
      const task = event.target;
      const rect = task.getBoundingClientRect();

      task.dataset.originalParent = task.closest(".tasks")?.id || "";
      task.dataset.offsetX = event.client.x - rect.left;
      task.dataset.offsetY = event.client.y - rect.top;

      document.body.appendChild(task);
      Object.assign(task.style, {
        position: "absolute",
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        zIndex: 9999,
      });

      task.classList.add("dragging");
    },

    move(event) {
      const task = event.target;
      const offsetX = parseFloat(task.dataset.offsetX) || 0;
      const offsetY = parseFloat(task.dataset.offsetY) || 0;

      const left = event.client.x - offsetX;
      const top = event.client.y - offsetY;

      task.style.left = `${left}px`;
      task.style.top = `${top}px`;
    },

    end(event) {
      const task = event.target;

      if (task.dataset.dropped !== "true") {
        const originalParent = document.getElementById(task.dataset.originalParent).childNodes[3];
        originalParent?.appendChild(task);
      }

      // Limpieza
      delete task.dataset.dropped;
      delete task.dataset.offsetX;
      delete task.dataset.offsetY;

      task.style.position = "";
      task.style.left = "";
      task.style.top = "";
      task.style.width = "";
      task.style.height = "";
      task.style.zIndex = "";
      task.classList.remove("dragging");
    },
  },
});

interact(".tasks").dropzone({
  accept: ".task-card",
  overlap: 0.7,
  async ondrop(event) {
    const task = event.relatedTarget;
    const targetColumn = event.target.closest(".tasks");
    const newState = targetColumn.closest(".column").id;

    task.dataset.dropped = "true";

    const response = await updateTaskState(task.id, newState);
    if (response.ok) {
      targetColumn.appendChild(task);
    }
  },
});
