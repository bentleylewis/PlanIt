import renderTodoList from './todoList';
import { Task, addTask, getProjects, getTasksByProject, getTodayTasks, getTomorrowTasks, getWeekTasks, getCompletedTasks } from './todoLogic';
import { updateTabCounters, updateProjectCounters } from './sidebar';
import { isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

function renderForm() {
  const appDiv = document.getElementById("app");

  // Create overlay div
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");


    const taskForm = document.createElement("form");
    taskForm.method = "dialog";
    taskForm.id = "task-form";

    const HeaderDiv = document.createElement("div");
    HeaderDiv.classList.add("header-div");
    HeaderDiv.textContent = "Add Task";
    taskForm.appendChild(HeaderDiv);

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.setAttribute("for", "task-title");
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.id = "task-title";
    titleInput.name = "title";
    titleInput.required = true;
    taskForm.appendChild(titleLabel);
    taskForm.appendChild(titleInput);

    const descLabel = document.createElement("label");
    descLabel.textContent = "Description";
    descLabel.setAttribute("for", "task-desc");
    const descInput = document.createElement("textarea");
    descInput.id = "task-desc";
    descInput.name = "description";
    descInput.required = true;
    descInput.rows = 3;
    taskForm.appendChild(descLabel);
    taskForm.appendChild(descInput);

    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority";
    priorityLabel.setAttribute("for", "task-priority");
    const prioritySelect = document.createElement("select");
    prioritySelect.id = "task-priority";
    prioritySelect.name = "priority";
    prioritySelect.required = true;
    [
      { value: "high", text: "High Priority" },
      { value: "medium", text: "Medium Priority" },
      { value: "low", text: "Low Priority" }
    ].forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.text;
      prioritySelect.appendChild(option);
    });
    taskForm.appendChild(priorityLabel);
    taskForm.appendChild(prioritySelect);

    // Date
    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Date";
    dateLabel.setAttribute("for", "task-date");
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "task-date";
    dateInput.name = "date";
    dateInput.required = true;
    taskForm.appendChild(dateLabel);
    taskForm.appendChild(dateInput);

    // Related Projects
    const projectsLabel = document.createElement("label");
    projectsLabel.textContent = "Related Projects";
    projectsLabel.setAttribute("for", "task-projects");
    const projectsSelect = document.createElement("select");
    projectsSelect.id = "task-projects";
    projectsSelect.name = "projects";
    projectsSelect.required = true;
   const projectLabels = getProjects();
   projectLabels.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt.name;
      option.textContent = opt.name;
      projectsSelect.appendChild(option);
    });
    taskForm.appendChild(projectsLabel);
    taskForm.appendChild(projectsSelect);

    // Submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Add Task";
    taskForm.appendChild(submitBtn);
    overlay.appendChild(taskForm);

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  appDiv.appendChild(overlay);

  function handleNewTask(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const priority = prioritySelect.value;
    const date = dateInput.value;
    const project = projectsSelect.value;

    if (title && description && priority && date && project) {
      const newTask = new Task(title, description, priority, date, project);
      addTask(newTask);
      if (typeof updateTabCounters === 'function') updateTabCounters();
      if (typeof updateProjectCounters === 'function') updateProjectCounters();
      overlay.remove();
      // re-render current view so the new task appears immediately where user expects
      const currentGroupEl = document.querySelector('.group-title');
      const currentGroup = currentGroupEl ? currentGroupEl.textContent.trim() : null;
      if (currentGroup) {
        if (currentGroup === newTask.project) {
          renderTodoList(() => getTasksByProject(newTask.project), newTask.project);
        } else if (currentGroup === 'Today') {
          renderTodoList(getTodayTasks, 'Today');
        } else if (currentGroup === 'Tomorrow') {
          renderTodoList(getTomorrowTasks, 'Tomorrow');
        } else if (currentGroup === 'This Week') {
          renderTodoList(getWeekTasks, 'This Week');
        } else if (currentGroup === 'Completed') {
          renderTodoList(getCompletedTasks, 'Completed');
        } else {
          renderTodoList();
        }
      } else {
        renderTodoList();
      }
      // refresh counters after rendering
      if (typeof updateTabCounters === 'function') updateTabCounters();
      if (typeof updateProjectCounters === 'function') updateProjectCounters();
        // also update the specific sidebar tab counter for the new task's interval
        try {
          const taskDate = parseISO(date);
          let tabName = null;
          if (isToday(taskDate)) tabName = 'Today';
          else if (isTomorrow(taskDate)) tabName = 'Tomorrow';
          else if (isThisWeek(taskDate)) tabName = 'This Week';

          if (tabName) {
            const sidebar = document.getElementById('sidebar-container');
            if (sidebar) {
              const sections = sidebar.querySelectorAll('.section-div');
              sections.forEach(sec => {
                const titleEl = sec.querySelector('.section-title');
                const counterEl = sec.querySelector('.section-counter');
                if (titleEl && counterEl && titleEl.textContent.trim() === tabName) {
                  // update to the latest count using direct functions
                  if (tabName === 'Today') counterEl.textContent = getTodayTasks().length;
                  else if (tabName === 'Tomorrow') counterEl.textContent = getTomorrowTasks().length;
                  else if (tabName === 'This Week') counterEl.textContent = getWeekTasks().length;
                }
              });
            }
          }
        } catch (e) {
          // ignore parse errors
        }
    }
  }

  taskForm.onsubmit = handleNewTask;
}

export default renderForm;