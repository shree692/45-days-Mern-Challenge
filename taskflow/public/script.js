let tasks = [];
let teams = [];

const totalTasksEl = document.getElementById("total-tasks");
const totalTeamsEl = document.getElementById("total-teams");
const taskForm = document.getElementById("task-form");
const teamForm = document.getElementById("team-form");
const teamList = document.getElementById("team-list");

const todoList = document.getElementById("todo-list");
const inprogressList = document.getElementById("inprogress-list");
const reviewList = document.getElementById("review-list");
const doneList = document.getElementById("done-list");

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("task-title").value;
  const desc = document.getElementById("task-desc").value;
  const priority = document.getElementById("task-priority").value;

  const task = { id: Date.now(), title, desc, priority, status: "To Do" };
  tasks.push(task);
  renderTasks();
  taskForm.reset();
});

teamForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("team-name").value;
  const team = { id: Date.now(), name };
  teams.push(team);
  renderTeams();
  teamForm.reset();
});

function renderTasks() {
  todoList.innerHTML = "";
  inprogressList.innerHTML = "";
  reviewList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";
    div.textContent = `${task.title} [${task.priority}]`;
    div.draggable = true;
    div.dataset.id = task.id;

    div.addEventListener("dragstart", dragStart);

    if(task.status === "To Do") todoList.appendChild(div);
    if(task.status === "In Progress") inprogressList.appendChild(div);
    if(task.status === "Review") reviewList.appendChild(div);
    if(task.status === "Done") doneList.appendChild(div);
  });

  totalTasksEl.textContent = tasks.length;
}

// Render Teams
function renderTeams() {
  teamList.innerHTML = "";
  teams.forEach(team => {
    const li = document.createElement("li");
    li.textContent = team.name;
    teamList.appendChild(li);
  });
  totalTeamsEl.textContent = teams.length;
}

// Drag & Drop
const columns = document.querySelectorAll(".column .task-list");
columns.forEach(col => {
  col.addEventListener("dragover", dragOver);
  col.addEventListener("drop", drop);
});

let draggedTaskId;

function dragStart(e) {
  draggedTaskId = e.target.dataset.id;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const columnStatus = e.currentTarget.parentElement.dataset.status;
  const task = tasks.find(t => t.id == draggedTaskId);
  task.status = columnStatus;
  renderTasks();
}
