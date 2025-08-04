import { updateTaskState } from "./api.js";

interact(".task-card").draggable({
  listeners: {
    start (event) {
      const task = event.target;
      task.classList.add("dragging");
      const rect = task.getBoundingClientRect();
      task.dataset.startLeft = rect.left;
      task.dataset.startTop = rect.top;
      task.dataset.originalParent = task.parentNode.parentNode.id;
      document.body.appendChild(task);
      Object.assign(task.style, {
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px` });
    },
    move (event) {
      const task = event.target;
      const x = (parseFloat(task.getAttribute("data-x")) || 0) + event.dx;
      const y = (parseFloat(task.getAttribute("data-y")) || 0) + event.dy;
      task.style.transform = `translate(${x}px, ${y}px)`;
      task.setAttribute("data-x", x);
      task.setAttribute("data-y", y);
    },
    end (event) {
      const task = event.target;
      const droppedInTasks = task.parentElement.classList.contains("tasks");
      if (!droppedInTasks) {
        const originalParent = document.getElementById(task.dataset.originalParent);
        originalParent?.appendChild(task);
      }
      task.style.transform = "";
      task.removeAttribute("data-x");
      task.removeAttribute("data-y");
      task.classList.remove("dragging");
    }
  }
});

interact(".tasks").dropzone({
  accept: ".task-card",
  overlap: 0.5,
  async ondrop(event) {
    const task = event.relatedTarget;
    const targetColumn = event.target;
    const newState = targetColumn.closest(".column").id;
    const response = await updateTaskState(task.id, newState);
    if (response.ok) {
      targetColumn.appendChild(task);
    }
  }
});
