{
    const tasks = [
        {
            content: "Kupić jajka",
            done: false,
        },
        {
            content: "Umyć patelnię",
            done: true,
        },
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

        for (const task of tasks) {
            htmlString += `
           <li ${task.done ? "class= \"list__Item\"" : ""}> 
           <button class="js-done">Zrobione?</button> 
            ${task.content}
            <button class="js-remove">Usuń</button> 
             </li>
        `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
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