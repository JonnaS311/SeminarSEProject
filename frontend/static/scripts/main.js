import { loadTasks, setupFormSubmit } from "./events.js";
import "./dragdrop.js";

window.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    setupFormSubmit();
});