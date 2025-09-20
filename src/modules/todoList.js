
let groupTitle;

export function updateGroupTitle(title) {
    if (groupTitle) groupTitle.textContent = title;
}


function renderTodoList() {
    const appDiv = document.getElementById("app");
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";

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

    mainContent.appendChild(bodyContainer);

    const counterContainer = document.createElement("div");
    counterContainer.id = "counter-container";
    bodyContainer.appendChild(counterContainer);

    const tasksCounter = document.createElement("div");
    tasksCounter.classList.add("counter");

    const taskNumber = document.createElement("span");
    taskNumber.classList.add("counter-number");
    taskNumber.textContent = "0";

    const taskLabel = document.createElement("span");
    taskLabel.classList.add("counter-label");
    taskLabel.textContent = " Tasks";

    tasksCounter.appendChild(taskNumber);
    tasksCounter.appendChild(taskLabel);
    counterContainer.appendChild(tasksCounter);

    const completedCounter = document.createElement("div");
    completedCounter.classList.add("counter");

    const completedNumber = document.createElement("span");
    completedNumber.classList.add("counter-number");
    completedNumber.textContent = "0";

    const completedLabel = document.createElement("span");
    completedLabel.classList.add("counter-label");
    completedLabel.textContent = " Completed";

    completedCounter.appendChild(completedNumber);
    completedCounter.appendChild(completedLabel);
    counterContainer.appendChild(completedCounter);
    const tasksContainer = document.createElement("div");
    tasksContainer.id = "tasks-container";

    bodyContainer.appendChild(tasksContainer);

    const fillerTasks = [
        { title: "Buy groceries", completed: false },
        { title: "Finish project", completed: true },
    ];

    fillerTasks.forEach(task  => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("tasks-div");
        tasksContainer.appendChild(taskDiv);

        if (task.completed) taskDiv.classList.add("completed");
        tasksContainer.appendChild(taskDiv);
    });



    const addButton = document.createElement("button");
    
};

export default renderTodoList;
