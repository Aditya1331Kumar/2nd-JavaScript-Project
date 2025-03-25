document.addEventListener("DOMContentLoaded", () => {
    const userName = "Aditya"; // Change it to user input if needed
    document.getElementById("userName").innerText = userName;

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskDate = document.getElementById("taskDate");
    const selectedDateText = document.getElementById("selectedDate");
    const progressFill = document.querySelector(".progress-fill");
    const progressPercent = document.getElementById("progress-percent");

    // Set current date in the calendar
    const today = new Date().toISOString().split('T')[0];
    taskDate.value = today;
    selectedDateText.innerText = today;

    let tasks = {}; // Store tasks for each date

    taskDate.addEventListener("change", () => {
        selectedDateText.innerText = taskDate.value;
        renderTasks();
    });

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const date = taskDate.value;
        if (!tasks[date]) tasks[date] = [];

        tasks[date].push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = "";
        const date = taskDate.value;
        if (!tasks[date]) return;

        tasks[date].forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>
                <span class="task-text">${task.text}</span>
                <button class="delete">x</button>
            `;

            li.querySelector(".checkbox").addEventListener("change", (e) => {
                tasks[date][index].completed = e.target.checked;
                updateProgress();
            });

            li.querySelector(".delete").addEventListener("click", () => {
                tasks[date].splice(index, 1);
                renderTasks();
            });

            taskList.appendChild(li);
        });

        updateProgress();
    }

    function updateProgress() {
        const date = taskDate.value;
        if (!tasks[date]) return;

        const completedTasks = tasks[date].filter(task => task.completed).length;
        const totalTasks = tasks[date].length;
        const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        progressFill.style.width = percentage + "%";
        progressPercent.innerText = percentage + "%";
    }
});
