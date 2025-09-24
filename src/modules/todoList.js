import { getTasks, getCompletedTasks, addTask, completeTask, getTodayTasks } from './todoLogic.js';
import renderForm from "./formModal";

let groupTitle;

export function updateGroupTitle(title) {
    if (groupTitle) groupTitle.textContent = title;
}

function renderTodoList(filterFn = getTodayTasks) {
    const allTasks = getTasks();
    const tasks = filterFn ? filterFn() : getTodayTasks();
    const completed = getCompletedTasks();

     const appDiv = document.getElementById("app");
    // Remove previous main-content if it exists
    const oldMainContent = document.getElementById("main-content");
    if (oldMainContent) {
        oldMainContent.remove();
    }
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";
    appDiv.appendChild(mainContent);

    const appHeader = document.createElement("div");
    appHeader.id = "app-header";
    const appIcon = document.createElement("i");
    appIcon.classList.add("fa-solid", "fa-earth-americas", "app-icon")
    const appTitle = document.createElement("div");
    appTitle.textContent = "PlanIt";
    
    appHeader.appendChild(appIcon);
    appHeader.appendChild(appTitle);
    mainContent.appendChild(appHeader);
    appDiv.appendChild(mainContent);
    
    const bodyContainer = document.createElement("div");
    bodyContainer.id = "body-container";

    groupTitle = document.createElement("div");
    groupTitle.classList.add("group-title");
    bodyContainer.appendChild(groupTitle);
    groupTitle.textContent = "Today";

    mainContent.appendChild(bodyContainer);

    const counterContainer = document.createElement("div");
    counterContainer.id = "counter-container";
    bodyContainer.appendChild(counterContainer);

    const tasksCounter = document.createElement("div");
    tasksCounter.classList.add("counter");

    const pendingNumber = document.createElement("span");
    pendingNumber.classList.add("counter-number");
    pendingNumber.textContent = tasks.length.toString();

    const pendingLabel = document.createElement("span");
    pendingLabel.classList.add("counter-label");
    pendingLabel.textContent = " Tasks";

    tasksCounter.appendChild(pendingNumber);
    tasksCounter.appendChild(pendingLabel);
    counterContainer.appendChild(tasksCounter);

    const completedCounter = document.createElement("div");
    completedCounter.classList.add("counter");

    const completedNumber = document.createElement("span");
    completedNumber.classList.add("counter-number");
    completedNumber.textContent = completed.length.toString();

    const completedLabel = document.createElement("span");
    completedLabel.classList.add("counter-label");
    completedLabel.textContent = " Completed";

    completedCounter.appendChild(completedNumber);
    completedCounter.appendChild(completedLabel);
    counterContainer.appendChild(completedCounter);


    const tasksContainer = document.createElement("div");
    tasksContainer.id = "tasks-container";
    bodyContainer.appendChild(tasksContainer);

    tasks.forEach((task, index)  => {

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("tasks-div");

        const leftTaskDiv = document.createElement("div");
        leftTaskDiv.classList.add("left-task-div");
        taskDiv.appendChild(leftTaskDiv);

        const dateDiv = document.createElement("div");
        dateDiv.classList.add("date-div");
        dateDiv.textContent = task.date;
        taskDiv.appendChild(dateDiv);

        const completeButton = document.createElement("button");
        completeButton.classList.add("complete-button");
        leftTaskDiv.appendChild(completeButton);

        completeButton.addEventListener("click", () => {
            completeButton.classList.add("completed");

            const checkIcon = document.createElement("i");
            checkIcon.classList.add("fa-solid", "fa-check", "checkmark-icon");
            completeButton.appendChild(checkIcon);

            setTimeout(() => {
                completeTask();
                renderTodoList();
            }, 250);
        });


        const taskNameDiv = document.createElement("div");
        taskNameDiv.classList.add("task-name-div");
        taskNameDiv.textContent = task.title;
        leftTaskDiv.appendChild(taskNameDiv);

        tasksContainer.appendChild(taskDiv);
    });


    const addButton = document.createElement("button");
    addButton.textContent = "+ Add Task";
    addButton.classList.add("add-task-button");
    bodyContainer.appendChild(addButton);

    addButton.addEventListener("click", () => {
        renderForm();
    })
    
};

export default renderTodoList;
