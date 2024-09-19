const taskForm: HTMLFormElement | null = document.querySelector("#taskForm");
const taskList: HTMLUListElement | null = document.querySelector("#taskList");
const filterCategoryElement: HTMLSelectElement | null =
  document.querySelector("#filterCategory");

interface Task {
  name: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  category: "Work" | "Personal" | "Groceries" | "All";
}

let tasks: Task[] = []; //array to store task objects

// Function to display tasks in the task list
function displayTasks(taskArray: Task[]) {
  if (taskList) {
    // Clear the list
    taskList.innerHTML = "";

    // Add tasks to the list
    taskArray.forEach((task, index) => {
      const li = document.createElement("li");
      // if task is completed  , apply strikethrough
      li.innerHTML = task.completed
        ? `<s>${task.name} (Due: ${task.dueDate}) [Priority: ${task.priority}] [Category: ${task.category}]</s>`
        : `${task.name} (Due: ${task.dueDate}) [Priority: ${task.priority}] [Category: ${task.category}]`;

      // create complete button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "undo" : "complete";

      completeBtn.addEventListener("click", () => {
        // Toggle  complete status
        tasks[index].completed = !tasks[index].completed;
        displayTasks(tasks);
      });

      // create "Delete" button

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener("click", () => {
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

function addTask(
  name: string,
  dueDate: string,
  priority: "Low" | "Medium" | "High",
  category: "Work" | "Personal" | "Groceries" | "All"
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

  // display the updated task
  displayTasks(tasks);
}

// implement Filtering by category

function filterTaskByCategories(
  category: "Work" | "Personal" | "Groceries" | "All"
) {
  if (category === "All") {
    // shows all the tasks if if "All" is selected is selected
    displayTasks(tasks);
  } else {
    // Filter tasks by the selected category
    const filteredTasks = tasks.filter((task) => task.category === category);
    displayTasks(filteredTasks); // Display the filtered tasks
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

// Add an event listener for filtering tasks by category

filterCategoryElement?.addEventListener("change", function () {
  const selectedCategory = filterCategoryElement.value as
    | "Work"
    | "Personal"
    | "Groceries"
    | "All";
  filterTaskByCategories(selectedCategory);
});
