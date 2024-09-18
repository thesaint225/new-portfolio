const taskForm: HTMLFormElement | null = document.querySelector("#taskForm");
const taskList: HTMLUListElement | null = document.querySelector("#taskList");

interface Task {
  name: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  category: "Work" | "Personal" | "Groceries";
}

let tasks: Task[] = []; //array to store task objects

// function to create a new task and add it to the task list

function addTask(
  name: string,
  dueDate: string,
  priority: "Low" | "Medium" | "High",
  category: "Work" | "Personal" | "Groceries"
) {
  // create a new task
  const newTask: Task = {
    name,
    dueDate,
    priority,
    completed: false,
    category,
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
  li.textContent = `${newTask.name}(DueDate:${newTask.dueDate}) [priority:${newTask.priority}] [Category:${newTask.category}]`;
  if (taskList) {
    taskList.appendChild(li);
  }
}

// implement Filtering by category

function filterTaskByCategories() {}

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

  const categoryElement: HTMLSelectElement | null =
    document.querySelector("#category");

  // ensure element exist before accessing .value
  if (taskNameElement && dueDateElement && priorityElement && categoryElement) {
    // Access the value of each element separately
    const taskName = taskNameElement.value.trim();
    const dueDate = dueDateElement.value;
    const priority = priorityElement.value as "Low" | "Medium" | "High";
    const category = categoryElement.value as "Work" | "Personal" | "Groceries";

    // Call the addTask function to handle the task creation
    addTask(taskName, dueDate, priority, category);

    // Clear the form (reset all input fields)
    taskForm.reset();
  }
});
