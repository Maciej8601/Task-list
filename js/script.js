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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
             <li ${task.done ? "class= \"listItem\"" : ""}>
            ${task.content}
             </li >
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        console.log(`Witam wszystkich`);
        render();
    };

    init();
}