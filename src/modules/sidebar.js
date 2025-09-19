function sidebar() {
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
    plansTitle.innerHTML = "Stars";
    sidebarContainerDiv.appendChild(plansTitle);
    plansTitle.classList.add("sidebar-headers");

    
    const taskSections = [
        {name: "Today", icon: "fa-sun", iconThickness: "fa-regular", counter: 0},
        {name: "Tomorrow", icon: "fa-moon", iconThickness: "fa-regular", counter: 0},
        {name: "This Week", icon: "fa-satellite-dish", iconThickness: "fa-solid", counter: 0},
        {name: "completed", icon: "fa-medal", iconThickness: "fa-solid", counter: 0},
    ];

    taskSections.forEach(section => {
        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("nav-tasks");
        
        const leftGroup = document.createElement("div");
        leftGroup.classList.add("left-group");

        const sectionIcon = document.createElement("i");
        sectionIcon.classList.add(section.iconThickness, section.icon, "section-icon");

        const sectionTitle = document.createElement("div");
        sectionTitle.classList.add("section-title");
        sectionTitle.innerHTML = section.name;

        const sectionCounter = document.createElement("div");
        sectionCounter.classList.add("section-counter");
        sectionCounter.innerHTML = section.counter;

        leftGroup.appendChild(sectionIcon);
        leftGroup.appendChild(sectionTitle);
        sectionDiv.appendChild(leftGroup);
        sectionDiv.appendChild(sectionCounter);
        sectionDiv.classList.add("section-div");

        tasksContainerDiv.appendChild(sectionDiv);
        addSidebarClickLogic(sectionDiv);
    });

    sidebarContainerDiv.appendChild(tasksContainerDiv);
    
    const projectsTitle = document.createElement("div");
    projectsTitle.innerHTML = "Constellations";
    sidebarContainerDiv.appendChild(projectsTitle);
    projectsTitle.classList.add("sidebar-headers");

    const projectsContainerDiv = document.createElement("div");
    projectsContainerDiv.classList.add("project-container");

    const projectSections = [
        {name: "General", icon: "fa-space-awesome", iconThickness: "fa-brands", counter: 0},
        {name: "Tomorrow", icon: "fa-space-awesome", iconThickness: "fa-brands", counter: 0},
    ];
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
        sectionCounter.innerHTML = section.counter;

        leftGroup.appendChild(sectionIcon);
        leftGroup.appendChild(sectionTitle);
        sectionDiv.appendChild(leftGroup);
        sectionDiv.appendChild(sectionCounter);
        sectionDiv.classList.add("section-div");

        projectsContainerDiv.appendChild(sectionDiv);
        addSidebarClickLogic(sectionDiv);
    });
        sidebarContainerDiv.appendChild(projectsContainerDiv);

    // to populate projectsDiv we would ideally call todoLogic.getProjects() to get an array and populate DOM by looping
    function addSidebarClickLogic(sectionDiv) {
        sectionDiv.addEventListener("click", () => {
            document.querySelectorAll(".section-div").forEach(div => {
                div.classList.remove("active");
            });

            sectionDiv.classList.add("active");
        });
    }
}


export default sidebar;