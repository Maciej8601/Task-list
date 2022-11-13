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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
           <li ${task.done ? "class= \"listItem\"" : ""}> 
           <button class="js-remove">
           Usuń
           </button> 
            ${task.content}
             </li >
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        console.log(`Witam wszystkich`);
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit
        )
    };

    init();
}