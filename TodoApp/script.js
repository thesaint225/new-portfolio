var taskForm = document.querySelector("#taskForm");
var taskList = document.querySelector("#taskList");
var filterCategoryElement = document.querySelector("#filterCategory");
var sortTasksElement = document.querySelector("#sortTasks");
var priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
};
var tasks = []; //array to store task objects
// function sorting tasks by specified criterion
function sortTasksByPriority(criterion) {
    if (criterion === "priority") {
        tasks.sort(function (a, b) {
            var priorityOrder = {
                Low: 1,
                Medium: 2,
                High: 3,
            };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }
    else if (criterion === "dueDate") {
        tasks.sort(function (a, b) { return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); });
    }
    else if (criterion === "complete") {
        tasks.sort(function (a, b) {
            return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        });
    }
}
// Function to display tasks in the task list
function displayTasks(taskArray) {
    if (taskList) {
        // Clear the list
        taskList.innerHTML = "";
        // Add tasks to the list
        taskArray.forEach(function (task, index) {
            var li = document.createElement("li");
            // if task is completed  , apply strikethrough
            li.innerHTML = task.completed
                ? "<s><strong>".concat(task.name, "</strong> <span>(Due: ").concat(task.dueDate, ")</span> <span>[Priority: ").concat(task.priority, "]</span> <span>[Category: ").concat(task.category, "]</span></s>")
                : "<strong>".concat(task.name, "</strong> <span>(Due: ").concat(task.dueDate, ")</span> <span>[Priority: ").concat(task.priority, "]</span> <span>[Category: ").concat(task.category, "]</span>");
            // Don't forget to add the priority class
            li.classList.add("priority-".concat(task.priority));
            // create complete button
            var completeBtn = document.createElement("button");
            completeBtn.textContent = task.completed ? "undo" : "complete";
            // Disable the "Complete" button if the task is completed
            completeBtn.disabled = task.completed;
            completeBtn.addEventListener("click", function () {
                // Toggle  complete status
                tasks[index].completed = !tasks[index].completed;
                displayTasks(tasks);
            });
            // create "Delete" button
            var deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function () {
                //remove Task
                tasks.splice(index, 1);
                // refresh the array
                displayTasks(tasks);
            });
            // append buttons to the list items
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            // append task to the task list
            taskList.appendChild(li);
        });
    }
}
// function to create a new task and add it to the task list
function addTask(name, dueDate, priority, category) {
    // create a new task
    var newTask = {
        name: name,
        dueDate: dueDate,
        priority: priority,
        completed: false,
        category: category,
    };
    // customer property
    // validate the task before pushing
    if (newTask.name.length === 0 || newTask.dueDate === "") {
        alert("task name and due date cannot be empty!");
        return;
    }
    // Add the task to the array
    tasks.push(newTask);
    // Apply sorting if any
    var sortCriterion = sortTasksElement === null || sortTasksElement === void 0 ? void 0 : sortTasksElement.value;
    sortTasksByPriority(sortCriterion);
    // display the updated task
    displayTasks(tasks);
}
// implement Filtering by category
function filterTaskByCategories(category) {
    if (category === "All") {
        // shows all the tasks if if "All" is selected is selected
        displayTasks(tasks);
    }
    else {
        // Filter tasks by the selected category
        var filteredTasks = tasks.filter(function (task) { return task.category === category; });
        displayTasks(filteredTasks); // Display the filtered tasks
    }
}
// adding the event listener for form submission
taskForm === null || taskForm === void 0 ? void 0 : taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Get the form Element using query selector
    var taskNameElement = document.querySelector("#taskName");
    var dueDateElement = document.querySelector("#dueDate");
    var priorityElement = document.querySelector("#priority");
    var categoryElement = document.querySelector("#category");
    // ensure element exist before accessing .value
    if (taskNameElement && dueDateElement && priorityElement && categoryElement) {
        // Access the value of each element separately
        var taskName = taskNameElement.value.trim();
        var dueDate = dueDateElement.value;
        var priority = priorityElement.value;
        var category = categoryElement.value;
        // Call the addTask function to handle the task creation
        addTask(taskName, dueDate, priority, category);
        // Clear the form (reset all input fields)
        taskForm.reset();
    }
});
// Add an event listener for filtering tasks by category
filterCategoryElement === null || filterCategoryElement === void 0 ? void 0 : filterCategoryElement.addEventListener("change", function () {
    var selectedCategory = filterCategoryElement.value;
    filterTaskByCategories(selectedCategory);
});
sortTasksElement === null || sortTasksElement === void 0 ? void 0 : sortTasksElement.addEventListener("change", function () {
    var selectedSort = sortTasksElement.value;
    sortTasksByPriority(selectedSort);
    displayTasks(tasks);
});
// toggle theme
var button = document.getElementById("toggleTheme");
// function to toggle theme
function toggleTheme() {
    var body = document.querySelector("body");
    if (body === null || body === void 0 ? void 0 : body.classList.contains("dark-mode")) {
        // switch to light-light
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light-mode");
    }
    else {
        // switch to dark-mode
        body === null || body === void 0 ? void 0 : body.classList.add("dark-mode");
        body === null || body === void 0 ? void 0 : body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark-mode");
    }
}
// add an event listener
button === null || button === void 0 ? void 0 : button.addEventListener("click", toggleTheme);
// on page load  , check for saved theme  and apply
window.onload = function () {
    var savedTheme = localStorage.getItem("theme");
    var body = document.querySelector("body");
    if (savedTheme && body) {
        body.classList.add(savedTheme);
    }
};
