{
    const tasks = [

    ];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const focusOnSubmit = () => {
        const newTask = document.querySelector(".js-newTask");
        newTask.value = "";
        newTask.focus();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
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

    const render = () => {
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

        bindEvents();
        inputElement.setAttribute("autofocus", "");
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