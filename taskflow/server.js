const apiBase = "http://localhost:3000/api";
async function fetchTasks() {
  try {
    const res = await fetch(`${apiBase}/tasks`);
    const tasks = await res.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${task.title} - ${task.status} - Priority: ${task.priority}`;
      taskList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}
async function fetchUsers() {
  try {
    const res = await fetch(`${apiBase}/users`);
    const users = await res.json();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach(user => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${user.name} (${user.email}) - Role: ${user.role}`;
      userList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

// Fetch teams
async function fetchTeams() {
  try {
    const res = await fetch(`${apiBase}/teams`);
    const teams = await res.json();
    const teamList = document.getElementById("teamList");
    teamList.innerHTML = "";
    teams.forEach(team => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `${team.name} - Members: ${team.members.length}`;
      teamList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching teams:", err);
  }
}

// Initialize
fetchTasks();
fetchUsers();
fetchTeams();
