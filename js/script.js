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

    const hideDoneAllTasks = () => {
        hideDoneTasks = !hideDoneTasks;
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

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
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

    const renderTasks = () => {
        let htmlString = "";

        const inputElement = document.querySelector("input");

        for (const task of tasks) {
            htmlString += `
            <li class = "js-tasks list"}> 
              <button class="list__button--done js-done">
                    ${task.done ? "✓" : ""}
               </button> 
               <span class="${task.done ? "list__item" : ""}">
                   ${task.content}</span>
               <button class="list__button--remove js-remove">🗑️</button> 
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
            <button class="list__button js-hideDone">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="list__button js-setAllDone" 
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
            `;
    };

    const bindButtonsEvents = () => {
        const hideDoneTasksButton = document.querySelectorAll(".js-hideDone");

        hideDoneTasksButton.forEach((hideDoneTasksButton, index) => {
            hideDoneTasksButton.addEventListener("click", () => {
                hideDoneAllTasks(index);
            });
        });

        const setAllDone = document.querySelectorAll(".js-setAllDone");

        setAllDone.forEach((setAllDone, index) => {
            setAllDone.addEventListener("click", () => {
                setAllTasksDone(index);
            });
        });
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
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