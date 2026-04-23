let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const input = document.getElementById("taskInput");

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-left">
                <div class="circle ${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})"></div>
                <span class="task-text ${task.completed ? 'completed' : ''}">
                    ${task.text}
                </span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">✖</button>
        `;

        list.appendChild(li);
    });

    updateCount();
}

function addTask() {
    const text = input.value.trim();
    if (!text) return;

    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

function updateCount() {
    const active = tasks.filter(t => !t.completed).length;
    document.getElementById("taskCount").innerText = `${active} tasks left`;
}

function setFilter(type) {
    filter = type;

    document.querySelectorAll(".filters button").forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");

    renderTasks();
}

renderTasks();
