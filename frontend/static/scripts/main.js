import { loadTasks, setupFormSubmit, filterBy } from "./events.js";
import "./dragdrop.js";

window.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupFormSubmit();
});

window.filterBy = filterBy;