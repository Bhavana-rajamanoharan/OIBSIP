document.addEventListener("DOMContentLoaded", loadTasks);

function getDateTime() {
    let now = new Date();
    return now.toLocaleString();
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please enter a task");

    let li = createTaskElement(taskText, getDateTime(), false);
    document.getElementById("pendingList").appendChild(li);

    saveTasks();
    taskInput.value = "";
}

function createTaskElement(text, time, completed) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = text;

    let timeDiv = document.createElement("div");
    timeDiv.className = "task-time";
    timeDiv.textContent = "Added: " + time;

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.onclick = () => completeTask(li);

    let editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.onclick = () => editTask(span);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => li.remove();

    li.append(span, timeDiv, completeBtn, editBtn, deleteBtn);

    if (completed) {
        li.style.opacity = "0.6";
        li.style.textDecoration = "line-through";
    }

    return li;
}

function completeTask(li) {
    let timeDiv = li.querySelector(".task-time");
    timeDiv.innerHTML += "<br>Completed: " + getDateTime();

    li.style.opacity = "0.6";
    li.style.textDecoration = "line-through";

    document.getElementById("completedList").appendChild(li);
    saveTasks();
}

function editTask(span) {
    let newText = prompt("Edit your task", span.textContent);
    if (newText) span.textContent = newText;
    saveTasks();
}

function saveTasks() {
    let pending = [];
    document.querySelectorAll("#pendingList li").forEach(li => {
        pending.push(li.querySelector("span").textContent);
    });

    let completed = [];
    document.querySelectorAll("#completedList li").forEach(li => {
        completed.push(li.querySelector("span").textContent);
    });

    localStorage.setItem("pendingTasks", JSON.stringify(pending));
    localStorage.setItem("completedTasks", JSON.stringify(completed));
}

function loadTasks() {
    let pending = JSON.parse(localStorage.getItem("pendingTasks")) || [];
    let completed = JSON.parse(localStorage.getItem("completedTasks")) || [];

    pending.forEach(task => {
        document.getElementById("pendingList").appendChild(createTaskElement(task, getDateTime(), false));
    });

    completed.forEach(task => {
        document.getElementById("completedList").appendChild(createTaskElement(task, getDateTime(), true));
    });
}
