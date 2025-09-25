import { updateGroupTitle } from "./todoList";
import renderTodoList from "./todoList";
import { getProjects, getTaskSections, addSidebarClickLogic, Project, addProject } from "./todoLogic";
import { getTodayTasks, getTomorrowTasks, getWeekTasks, getCompletedTasks, getTasks, getCompletedTasks as getCompleted, getTasksByProject } from "./todoLogic";

// keep tabFunctions and a counter-elements map at module scope so they can be updated later
const tabFunctions = {
    "Today": getTodayTasks,
    "Tomorrow": getTomorrowTasks,
    "This Week": getWeekTasks,
    "Completed": getCompletedTasks
};

const tabCountersMap = {}; // tabName -> DOM element
const projectCountersMap = {}; // projectName -> DOM element

export function updateTabCounters() {
    // Explicitly update the four known tabs to avoid any mapping/closure issues
    const mapping = {
        Today: getTodayTasks,
        Tomorrow: getTomorrowTasks,
        'This Week': getWeekTasks,
        Completed: getCompletedTasks,
    };

    Object.entries(mapping).forEach(([tabName, fn]) => {
        const el = tabCountersMap[tabName];
        if (!el) return;
        try {
            el.textContent = fn().length;
        } catch (e) {
            // fallback: zero
            el.textContent = '0';
        }
    });
}

export function updateProjectCounters() {
    // recompute completed/total for each project and update stored DOM elements
    Object.entries(projectCountersMap).forEach(([projectName, el]) => {
        if (!el) return;
        try {
            const pending = getTasks().filter(t => t.project === projectName).length;
            const completedInProject = getCompleted().filter(t => t.project === projectName).length;
            el.textContent = `${completedInProject}/${completedInProject + pending}`;
        } catch (e) {
            el.textContent = '0';
        }
    });
}

function sidebar() {

        // tabFunctions is defined in module scope

    const appDiv = document.getElementById("app");

    const sidebarContainerDiv = document.createElement("div");
    sidebarContainerDiv.id = 'sidebar-container';
    sidebarContainerDiv.classList.add("open");
     appDiv.appendChild(sidebarContainerDiv);

    const toggleButton = document.createElement("button");
    const toggleIcon = document.createElement("i");
    toggleIcon.classList.add("fa-solid", "fa-user-astronaut");
    toggleButton.appendChild(toggleIcon);
    toggleButton.id = "sidebar-toggle";
    toggleButton.classList.add("toggle-active");

     toggleButton.addEventListener( "click", () => {
        toggleButton.classList.toggle("toggle-active");
        sidebarContainerDiv.classList.toggle("open");
     });

    appDiv.appendChild(toggleButton);

    const spacerDiv = document.createElement("div");
    spacerDiv.classList.add("spacer-div");
    sidebarContainerDiv.appendChild(spacerDiv);


    const tasksContainerDiv = document.createElement("div");
    tasksContainerDiv.classList.add("tasks-container");

    const plansTitle = document.createElement("div");
    plansTitle.innerHTML = "Tasks";
    sidebarContainerDiv.appendChild(plansTitle);
    plansTitle.classList.add("sidebar-headers");

     

    Object.entries(tabFunctions).forEach(([tabName, filterFn]) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("nav-tasks");
        
        const leftGroup = document.createElement("div");
        leftGroup.classList.add("left-group");

        const sectionIcon = document.createElement("i");
        if (tabName === "Today") sectionIcon.classList.add("fa-solid", "fa-calendar-day", "section-icon");
        else if (tabName === "Tomorrow") sectionIcon.classList.add("fa-solid", "fa-calendar-plus", "section-icon");
        else if (tabName === "This Week") sectionIcon.classList.add("fa-solid", "fa-calendar-week", "section-icon");

        const sectionTitle = document.createElement("div");
        sectionTitle.classList.add("section-title");
        sectionTitle.innerHTML = tabName;

    const sectionCounter = document.createElement("div");
    sectionCounter.classList.add("section-counter");
    sectionCounter.textContent = filterFn().length;
    // store reference so counters can be updated later
    tabCountersMap[tabName] = sectionCounter;

        
        leftGroup.appendChild(sectionIcon);
        leftGroup.appendChild(sectionTitle);
        sectionDiv.appendChild(leftGroup);
        sectionDiv.appendChild(sectionCounter);
        sectionDiv.classList.add("section-div");
        
        tasksContainerDiv.appendChild(sectionDiv);
        addSidebarClickLogic(sectionDiv);
    
        sectionDiv.addEventListener("click", () => {
        updateGroupTitle(tabName);
        renderTodoList(filterFn, tabName);
         });
        });

    sidebarContainerDiv.appendChild(tasksContainerDiv);
    
    const projectsTitle = document.createElement("div");
    projectsTitle.innerHTML = "Projects";
    sidebarContainerDiv.appendChild(projectsTitle);
    projectsTitle.classList.add("sidebar-headers");

    const projectsContainerDiv = document.createElement("div");
    projectsContainerDiv.classList.add("project-container");

function renderProjectsSection() {
    projectsContainerDiv.innerHTML = ""; // Clear old projects

    const projectSections = getProjects();

    projectSections.forEach(section => {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("project-div");

        const leftGroup = document.createElement("div");
        leftGroup.classList.add("left-group");

        const sectionIcon = document.createElement("i");
        sectionIcon.classList.add(section.iconThickness, section.icon, "section-icon");
        
        const sectionTitle = document.createElement("div");
        sectionTitle.classList.add("section-title");
        sectionTitle.innerHTML = section.name;

        const sectionCounter = document.createElement("div");
        sectionCounter.classList.add("section-counter");
        // compute completed/total per project
        try {
            const pending = getTasks().filter(t => t.project === section.name).length;
            const completedInProject = getCompleted().filter(t => t.project === section.name).length;
            sectionCounter.innerHTML = `${completedInProject}/${completedInProject + pending}`;
        } catch (e) {
            sectionCounter.innerHTML = section.counter;
        }
        // store for later updates
        projectCountersMap[section.name] = sectionCounter;
        
        leftGroup.appendChild(sectionIcon);
        leftGroup.appendChild(sectionTitle);
        sectionDiv.appendChild(leftGroup);
        sectionDiv.appendChild(sectionCounter);
        sectionDiv.classList.add("section-div");
        projectsContainerDiv.appendChild(sectionDiv);
        addSidebarClickLogic(sectionDiv);
        sectionDiv.addEventListener("click", () => {
            updateGroupTitle(section.name);
            // render tasks for this project
            renderTodoList(() => getTasksByProject(section.name), section.name);
        });
    });
    projectsContainerDiv.appendChild(createAddProjectButton());
}

    // Create and append Add Project button after all project sections
    function createAddProjectButton() {
        const addProjectDiv = document.createElement("div");
        addProjectDiv.classList.add("project-div", "section-div", "add-project-div");

        const leftGroup = document.createElement("div");
        leftGroup.classList.add("left-group");

        const addProjectIcon = document.createElement("i");
        addProjectIcon.classList.add("fa-solid", "fa-plus", "section-icon");

        const addProjectTitle = document.createElement("div");
        addProjectTitle.classList.add("section-title");
        addProjectTitle.textContent = "Add Project";

        leftGroup.appendChild(addProjectIcon);
        leftGroup.appendChild(addProjectTitle);
        addProjectDiv.appendChild(leftGroup);

        addProjectDiv.addEventListener("click", () => {
            // Replace button with input box
            const inputDiv = document.createElement("div");
            inputDiv.classList.add("add-project-input-box");

            const input = document.createElement("input");
            input.type = "text";
            input.classList.add("add-project-input");

            const btnRow = document.createElement("div");
            btnRow.classList.add("add-project-btn-row");

            
            const cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";
            cancelBtn.classList.add("add-project-cancel-btn");

            const confirmBtn = document.createElement("button");
            confirmBtn.textContent = "Add";
            confirmBtn.classList.add("add-project-confirm-btn");
            
            btnRow.appendChild(cancelBtn);
            btnRow.appendChild(confirmBtn);

            inputDiv.appendChild(input);
            inputDiv.appendChild(btnRow);

            addProjectDiv.replaceWith(inputDiv);

            cancelBtn.addEventListener("click", () => {
                inputDiv.replaceWith(createAddProjectButton());
            });
            confirmBtn.addEventListener("click", () => {
                const newProjectName = input.value.trim();
                if (newProjectName) {
                    const newProject = Project(newProjectName);
                    console.log(newProject);
                    addProject(newProject);
                    addProjectDiv.innerHTML = '';
                    renderProjectsSection();
                } else {
                    inputDiv.replaceWith(createAddProjectButton());
                }
                });
        });
        return addProjectDiv;
    }
    sidebarContainerDiv.appendChild(projectsContainerDiv);
    renderProjectsSection();
}

export default sidebar;