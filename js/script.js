{
  let tasks = [];
  let hideDoneTask = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent },
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const toggleTaskDone = (tasks, taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex].done = !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };
  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(tasks, taskIndex);
      });
    });
  };

  const bindButtonEvents = () => {
    const hideDoneTasksButton = document.querySelector(".js-hideAllDoneTasks");
    const allTasksDoneButton = document.querySelector(".js-allTasksDone");

    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener("click", hideDoneTasks);

    };

    if (allTasksDoneButton) {
      allTasksDoneButton.addEventListener("click", allTaskDone);
    };
  };

  const renderTasks = () => {
    let tasksListHTMLContent = "";

    for (const task of tasks) {
      tasksListHTMLContent += `
<li class="tasks__item js-task${hideDoneTask && task.done ? " tasks__item--hidden " : ""}"> 
<button class="tasks__button 
tasks__button--toggleDone js-toggleDone"> 
${task.done ? "✔" : ""} 
</button>
<span class="tasks__content${task.done ? " tasks__content--done " :
          ""}">${task.content}</span> 
<button class="tasks__button 
tasks__button--remove js-remove">
🗑
</button>
</li>
  `;
    };

    document.querySelector(".js-tasks").innerHTML = tasksListHTMLContent;
  };

  const renderButtons = () => {
    let HTMLButtonString = "";

    if (tasks.length !== 0) {
      HTMLButtonString += `
          <button 
             class="js-hideAllDoneTasks button__hideAll" 
             ${tasks.some(({ done }) => done) ? "" : " disabled"}>
             ${hideDoneTask ? "Pokaż " : "Ukryj "}ukończone
          </button>
          <button class="js-allTasksDone button__makeAllDone"
             ${tasks.every(({ done }) => done) ? " disabled" : ""}>
             Ukończ wszystkie
          </button>
       `
    };

    document.querySelector(".js-tasksListButton").innerHTML = HTMLButtonString;
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonEvents();
  };

  const hideDoneTasks = () => {
    hideDoneTask = !hideDoneTask;
    render();
  };

  const allTaskDone = () => {
    tasks = tasks.map((tasks) => ({
      ...tasks,
      done: true,
    }));
    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }

    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
