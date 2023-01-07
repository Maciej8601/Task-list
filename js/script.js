{
    let tasks = [
    ];

    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ],
            render();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const setAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const focusOnSubmit = () => {
        const newTask = document.querySelector(".js-newTask");
        newTask.value = "";
        newTask.focus();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindToggleEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const toggleHideDoneTasksButton = document.querySelector(".js-hideDone");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        };

        const markAllTasksDoneButton = document.querySelector(".js-setAllDone");

        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", setAllTasksDone);
        };
    };

    const renderTasks = () => {
        let htmlString = "";

        const inputElement = document.querySelector("input");

        for (const task of tasks) {
            htmlString += `
            <li class = "js-tasks task__item${task.done && hideDoneTasks ? " task__item--hidden" : ""}"}> 
              <button class="task__button task__button--toggleDone js-done">
                    ${task.done ? "✓" : ""}
               </button> 
               <span class="task__content${task.done ? " task__content--done" : ""}">
                   ${task.content}</span>
               <button class="task__button task__button--remove js-remove">🗑️</button> 
            </li>
        `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
        inputElement.setAttribute("autofocus", "");
    };

    const renderButtons = () => {
        const listButtonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            listButtonsElement.innerHTML = "";
            return;
        };

        listButtonsElement.innerHTML = `
            <button class="section__buttons js-hideDone">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="${!tasks.every(({ done }) => done) ? " section__buttons" : "section__buttons--disabled"} js-setAllDone" 
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
            `;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindToggleEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        };

        if (newTaskContent === "") {
            focusOnSubmit();
            return;
        }

        addNewTask(newTaskContent);
        focusOnSubmit();
    };

    const init = () => {
        console.log(`Witam wszystkich`);
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit
        );
    };

    init();
}