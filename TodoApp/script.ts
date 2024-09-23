const taskForm: HTMLFormElement | null = document.querySelector("#taskForm");
const taskList: HTMLUListElement | null = document.querySelector("#taskList");
const filterCategoryElement: HTMLSelectElement | null =
  document.querySelector("#filterCategory");
const sortTasksElement: HTMLSelectElement | null =
  document.querySelector("#sortTasks");

interface Task {
  name: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
  category: "Work" | "Personal" | "Groceries" | "All";
}

type PriorityOrder = {
  Low: number;
  Medium: number;
  High: number;
};

const priorityOrder: PriorityOrder = {
  Low: 1,
  Medium: 2,
  High: 3,
};

let tasks: Task[] = []; //array to store task objects

// function sorting tasks by specified criterion
function sortTasksByPriority(criterion: "priority" | "dueDate" | "complete") {
  if (criterion === "priority") {
    tasks.sort((a, b) => {
      const priorityOrder: { [key: string]: number } = {
        Low: 1,
        Medium: 2,
        High: 3,
      };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  } else if (criterion === "dueDate") {
    tasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  } else if (criterion === "complete") {
    tasks.sort((a, b) =>
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    );
  }
}

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
        ? `<s><strong>${task.name}</strong> <span>(Due: ${task.dueDate})</span> <span>[Priority: ${task.priority}]</span> <span>[Category: ${task.category}]</span></s>`
        : `<strong>${task.name}</strong> <span>(Due: ${task.dueDate})</span> <span>[Priority: ${task.priority}]</span> <span>[Category: ${task.category}]</span>`;

      // Don't forget to add the priority class
      li.classList.add(`priority-${task.priority}`);
      // create complete button
      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "undo" : "complete";

      // Disable the "Complete" button if the task is completed
      completeBtn.disabled = task.completed;

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

  // customer property

  // validate the task before pushing
  if (newTask.name.length === 0 || newTask.dueDate === "") {
    alert("task name and due date cannot be empty!");
    return;
  }
  // Add the task to the array
  tasks.push(newTask);

  // Apply sorting if any
  const sortCriterion = sortTasksElement?.value as
    | "priority"
    | "dueDate"
    | "complete";

  sortTasksByPriority(sortCriterion);

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

sortTasksElement?.addEventListener("change", function () {
  const selectedSort = sortTasksElement.value as
    | "priority"
    | "dueDate"
    | "complete";

  sortTasksByPriority(selectedSort);
  displayTasks(tasks);
});

// toggle theme
const button: HTMLElement | null = document.getElementById("toggleTheme");

// function to toggle theme

function toggleTheme() {
  const body: HTMLBodyElement | null = document.querySelector("body");

  if (body?.classList.contains("dark-mode")) {
    // switch to light-light
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");

    localStorage.setItem("theme", "light-mode");
  } else {
    // switch to dark-mode
    body?.classList.add("dark-mode");
    body?.classList.remove("light-mode");

    localStorage.setItem("theme", "dark-mode");
  }
}

// add an event listener
button?.addEventListener("click", toggleTheme);

// on page load  , check for saved theme  and apply

window.onload = function () {
  const savedTheme: string | null = localStorage.getItem("theme");
  const body: HTMLBodyElement | null = document.querySelector("body");
  if (savedTheme && body) {
    body.classList.add(savedTheme);
  }
};
