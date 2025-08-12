function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            <button onclick="completeTask(this)">✔</button>
            <button onclick="editTask(this)">✏</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;
    document.getElementById("pendingList").appendChild(li);

    taskInput.value = "";
}

function completeTask(btn) {
    let li = btn.parentElement.parentElement;
    document.getElementById("completedList").appendChild(li);
}

function editTask(btn) {
    let li = btn.parentElement.parentElement;
    let newTask = prompt("Edit task:", li.querySelector("span").textContent);
    if (newTask) {
        li.querySelector("span").textContent = newTask;
    }
}

function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
}
