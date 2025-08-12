function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = taskText;

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.onclick = function () {
        document.getElementById("completedList").appendChild(li);
        completeBtn.remove(); // Remove complete button after marking as done
    };

    let editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.onclick = function () {
        let newTask = prompt("Edit task:", span.textContent);
        if (newTask) {
            span.textContent = newTask.trim();
        }
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = function () {
        li.remove();
    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    document.getElementById("pendingList").appendChild(li);
    taskInput.value = "";
}
