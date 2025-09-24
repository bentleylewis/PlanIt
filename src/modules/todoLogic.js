import { format, addDays, isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

export function getToday () {
  return new Date();
}

export function getTodayTasks() {
  return fillerTasks.filter(task => isToday(parseISO(task.date)));
}

export function getTomorrowTasks () {
  return fillerTasks.filter(task => isTomorrow(parseISO(task.date)));
}

export function getWeekTasks() {
  return fillerTasks.filter(task => isThisWeek(parseISO(task.date)));
}

export function displayDate(task) {
  return format(parseISO(task.date), 'EEEE, d MMM yyyy')
}

let fillerTasks = [
        { title: "Buy groceries", date: "2025-09-23", project: "General"},
        { title: "Finish project", date: "2025-09-24" },
];



  const taskSections = [
        {name: "Today", icon: "fa-sun", iconThickness: "fa-regular", counter: 0},
        {name: "Tomorrow", icon: "fa-moon", iconThickness: "fa-regular", counter: 0},
        {name: "This Week", icon: "fa-satellite-dish", iconThickness: "fa-solid", counter: 0},
        {name: "Completed", icon: "fa-medal", iconThickness: "fa-solid", counter: 0},
    ];

 let projectLabels = [
        {name: "General", icon: "fa-space-awesome", iconThickness: "fa-brands", counter: 0},
 ];

let completedTasks = [];

export function getTaskSections() {
  return taskSections;
}

export function getProjects() {
  return projectLabels;
}

export function getTasks() {
  return fillerTasks;
}

export function getCompletedTasks() {
  return completedTasks;
}

export function addTask(task) {
  fillerTasks.push(task);
}

export function addProject(project) {
  projectLabels.push(project);
}
export function completeTask(index) {
  completedTasks.push(fillerTasks[index]);
  fillerTasks.splice(index, 1);
}


export function Task(title, description, priority, date, project) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.date = date;
    this.project = project;
}


export function addSidebarClickLogic(sectionDiv) {
        sectionDiv.addEventListener("click", () => {
            document.querySelectorAll(".section-div").forEach(div => {
                div.classList.remove("active");
            });

            sectionDiv.classList.add("active");
        });
    }

export function Project(name) {
  return {
    name,
    icon: "fa-space-awesome",
    iconThickness: "fa-brands",
    counter: 0,
  };
}