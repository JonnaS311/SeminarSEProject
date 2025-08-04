export function createTaskCard(task, { onDelete, onMove, onTogglePriority }) {
    const div = document.createElement("div");
    div.className = "task-card";
    div.id = task.task_id;

    const priorityClass = task.priority ? "star" : "priority";

    div.innerHTML = `
        <div class="task-header">${task.title}</div>
        <div class="task-body">
            <div class="task-info">
                <input type="text" value="${task.date}" readonly>
                <input type="text" value="${task.assignee}" readonly>
            </div>
            <div class="task-desc">${task.description}</div>
        </div>
        <div class="task-footer">
            <div class="task-actions">
                <button class="${priorityClass}"><img src="./static/images/star.svg" alt="Star" width="16" height="16"></button>
                <button class="delete"><img src="./static/images/del.svg" alt="Delete" width="16" height="16"></button>
            </div>
            <button class="task-send">➔</button>
        </div>`;

    div.querySelector(".delete").onclick = () => onDelete(task.task_id);
    div.querySelector(".task-send").onclick = () => onMove(task.task_id);
    div.querySelector(`.task-actions .${priorityClass}`).onclick = () => onTogglePriority(task.task_id);

    return div;
}

export function clearTasks(container) {
    container.innerHTML = "";
}

export function appendTask(container, taskCard) {
    container.appendChild(taskCard);
}

export function getTaskContainers() {
    return {
        todo: document.getElementById("todo").childNodes[3],
        doing: document.getElementById("doing").childNodes[3],
        done: document.getElementById("done").childNodes[3]
    };
}