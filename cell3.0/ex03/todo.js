document.addEventListener("DOMContentLoaded", function() {
    const ftList = document.getElementById("ft_list");
    const addTaskForm = document.getElementById("addTaskForm");
    // const taskInput = document.getElementById("taskInput");
    var taskInput = ""
    

    // Carregar lista de tarefas do cookie ao carregar a página
    loadTasks();

    addTaskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        taskInput = window.prompt("Digite a descrição da tarefa...")
        const taskDescription = taskInput.trim();
        if (taskDescription) {
            addTask(taskDescription);
            //taskInput.value = ""; // Limpa o campo de entrada após adicionar a tarefa
        }
    });

    ftList.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-btn")) {
            const taskElement = event.target.parentElement;
            const confirmDelete = confirm("Tem certeza que deseja remover esta tarefa?");
            if (confirmDelete) {
                removeTask(taskElement);
            }
        }
    });

    function addTask(description) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const taskText = document.createElement("span");
        taskText.textContent = description;
        taskElement.appendChild(taskText);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.classList.add("remove-btn");
        taskElement.appendChild(removeButton);

        ftList.prepend(taskElement);
        saveTasks();
    }

    function removeTask(taskElement) {
        taskElement.remove();
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        ftList.querySelectorAll(".task span").forEach(task => {
            tasks.push(task.textContent);
        });
        setCookie("tasks", JSON.stringify(tasks), 365); // Defina o cookie para expirar em 365 dias
    }

    function loadTasks() {
        const tasksCookie = getCookie("tasks");
        if (tasksCookie) {
            const tasks = JSON.parse(tasksCookie);
            tasks.forEach(task => {
                addTask(task);
            });
        }
    }

    function setCookie(name, value, daysToExpire) {
        const date = new Date();
        date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Definir cookie com tempo de expiração
    }

    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) == 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }
});
