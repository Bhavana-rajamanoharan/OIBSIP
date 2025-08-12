const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  addDeleteListeners();
}

function addTask(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete">X</button>
  `;

  li.querySelector("span").addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  saveTasks();
}

function addDeleteListeners() {
  document.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", function () {
      this.parentElement.remove();
      saveTasks();
    });
  });

  document.querySelectorAll("#taskList span").forEach(span => {
    span.addEventListener("click", function () {
      this.parentElement.classList.toggle("completed");
      saveTasks();
    });
  });
}

addBtn.addEventListener("click", () => {
  if (taskInput.value.trim() !== "") {
    addTask(taskInput.value.trim());
    taskInput.value = "";
  }
});

loadTasks();
