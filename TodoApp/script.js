var taskForm = document.querySelector("#taskForm");
var taskList = document.querySelector("#taskList");
var tasks = []; //array to store task objects
// function to create a new task and add it to the task list
function addTask(name, dueDate, priority) {
    // create a new task
    var newTask = {
        name: name,
        dueDate: dueDate,
        priority: priority,
        completed: false,
    };
    // validate the task before pushing
    if (newTask.name.length === 0 || newTask.dueDate === "") {
        alert("task name and due date cannot be empty!");
        return;
    }
    // Add the task to the array
    tasks.push(newTask);
    // display  the task in task list (ul )
    var li = document.createElement("li");
    li.textContent = "".concat(newTask.name, "(DueDate:").concat(newTask.dueDate, ") [priority:").concat(newTask.priority, "]");
    if (taskList) {
        taskList.appendChild(li);
    }
}
// adding the event listener for form submission
taskForm === null || taskForm === void 0 ? void 0 : taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Get the form Element using query selector
    var taskNameElement = document.querySelector("#taskName");
    var dueDateElement = document.querySelector("#dueDate");
    var priorityElement = document.querySelector("#priority");
    // ensure element exist before accessing .value
    if (taskNameElement && dueDateElement && priorityElement) {
        // Access the value of each element separately
        var taskName = taskNameElement.value.trim();
        var dueDate = dueDateElement.value;
        var priority = priorityElement.value;
        // Call the addTask function to handle the task creation
        addTask(taskName, dueDate, priority);
        // Clear the form (reset all input fields)
        taskForm.reset();
    }
});
// taskForm?.addEventListener("submit", function (e) {
//   e.preventDefault(); //to prevent form from submitting normally
//   //   Get  Form elements using querySelector
//   const taskNameElement: HTMLInputElement | null =
//     document.querySelector("#taskName");
//   const dueDateElement: HTMLInputElement | null =
//     document.querySelector("#dueDate");
//   const priorityElement: HTMLSelectElement | null =
//     document.querySelector("#priority");
//   // ensure element exist before accessing .value
//   if (taskNameElement && dueDateElement && priorityElement) {
//     // Access the value of each element separately
//     const taskName = taskNameElement.value.trim();
//     const dueDate = dueDateElement.value;
//     const priority = priorityElement.value;
//     // create a new  task
//     const newTask = {
//       name: taskName,
//       dueDate: dueDate,
//       priority: priority as "Low" | "Medium" | "High",
//       completed: false,
//     };
//     // Add the task to array
//     tasks.push(newTask);
//     // display the task in the taskList (ul)
//     const li = document.createElement("li");
//     li.textContent = `${newTask.name} (Due:${newTask.dueDate}) [Priority : ${newTask.priority}]`;
//     if (taskList) {
//       taskList.appendChild(li);
//     }
//     // clear the form (reset all input fields)
//     taskForm.reset();
//   }
// });
