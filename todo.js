document.addEventListener("DOMContentLoaded", () => {
  const pendingKey = "pendingTasks";
  const completedKey = "completedTasks";

  let pendingTasks = [];
  let completedTasks = [];

  const taskInput = document.getElementById("taskInput");
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");

  function saveTasks() {
    localStorage.setItem(pendingKey, JSON.stringify(pendingTasks));
    localStorage.setItem(completedKey, JSON.stringify(completedTasks));
  }

  function loadTasks() {
    pendingTasks = JSON.parse(localStorage.getItem(pendingKey)) || [];
    completedTasks = JSON.parse(localStorage.getItem(completedKey)) || [];
    render();
  }

  function createTaskElement(text, isCompleted) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;

    const btnWrap = document.createElement("div");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.addEventListener("click", () => {
      if (!isCompleted) completeTask(text);
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "✎";
    editBtn.addEventListener("click", () => {
      editTask(text, isCompleted);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
      deleteTask(text, isCompleted);
    });

    btnWrap.append(completeBtn, editBtn, deleteBtn);
    li.append(span, btnWrap);

    if (isCompleted) {
      li.style.opacity = "0.6";
      span.style.textDecoration = "line-through";
    }

    return li;
  }

  function render() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    pendingTasks.forEach(task => {
      pendingList.appendChild(createTaskElement(task, false));
    });

    completedTasks.forEach(task => {
      completedList.appendChild(createTaskElement(task, true));
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
      alert("Please enter a task");
      return;
    }
    pendingTasks.push(text);
    saveTasks();
    render();
    taskInput.value = "";
  }

  function completeTask(text) {
    pendingTasks = pendingTasks.filter(t => t !== text);
    completedTasks.unshift(text);
    saveTasks();
    render();
  }

  function editTask(oldText, isCompleted) {
    const newText = prompt("Edit task:", oldText);
    if (newText && newText.trim() !== "") {
      if (isCompleted) {
        completedTasks = completedTasks.map(t => (t === oldText ? newText : t));
      } else {
        pendingTasks = pendingTasks.map(t => (t === oldText ? newText : t));
      }
      saveTasks();
      render();
    }
  }

  function deleteTask(text, isCompleted) {
    if (isCompleted) {
      completedTasks = completedTasks.filter(t => t !== text);
    } else {
      pendingTasks = pendingTasks.filter(t => t !== text);
    }
    saveTasks();
    render();
  }

  document.querySelector(".input-section button").addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  loadTasks();
});
