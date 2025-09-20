
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

    const groupTitle = document.createElement("div");
    groupTitle.classList.add("group-title");
    bodyContainer.appendChild(groupTitle);

    const counterContainer = document.createElement("div");
    
    const tasksContainer = document.createElement("div");
    
    const addButton = document.createElement("button");
    
};

export default renderTodoList;
