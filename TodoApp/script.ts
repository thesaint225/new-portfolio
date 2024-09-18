const taskForm: HTMLFormElement | null = document.querySelector("#taskForm");
const taskList: HTMLUListElement | null = document.querySelector("#taskList");

interface Task {
  name: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
}

let tasks: Task[] = []; //array to store task objects

// function to create a new task and add it to the task list

function addTask(
  name: string,
  dueDate: string,
  priority: "Low" | "Medium" | "High"
) {
  // create a new task
  const newTask: Task = {
    name,
    dueDate,
    priority,
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
  const li = document.createElement("li");
  li.textContent = `${newTask.name}(DueDate:${newTask.dueDate}) [priority:${newTask.priority}]`;
  if (taskList) {
    taskList.appendChild(li);
  }
}

// adding the event listener for form submission

taskForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  // Get the form Element using query selector
  const taskNameElement: HTMLInputElement | null =
    document.querySelector("#taskName");

  const dueDateElement: HTMLInputElement | null =
    document.querySelector("#dueDate");

  const priorityElement: HTMLSelectElement | null =
    document.querySelector("#priority");

  // ensure element exist before accessing .value
  if (taskNameElement && dueDateElement && priorityElement) {
    // Access the value of each element separately
    const taskName = taskNameElement.value.trim();
    const dueDate = dueDateElement.value;
    const priority = priorityElement.value as "Low" | "Medium" | "High";

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
