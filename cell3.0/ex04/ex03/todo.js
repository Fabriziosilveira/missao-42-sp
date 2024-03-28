$(function() {
    const ftList = $("#ft_list");
    const addTaskForm = $("#addTaskForm");
    let taskInput = "";

    // Load tasks from cookie on page load
    loadTasks();

    // Submitting the add task form
    addTaskForm.submit(function(event) {
        event.preventDefault();
        taskInput = window.prompt("Digite a descrição da tarefa...");
        const taskDescription = taskInput.trim();
        if (taskDescription) {
            addTask(taskDescription);
            //taskInput.val(""); // Clear input field after adding task (if using a form field)
        }
    });

    // Removing a task
    ftList.on("click", ".remove-btn", function() {
        const taskElement = $(this).parent();
        const confirmDelete = confirm("Tem certeza que deseja remover esta tarefa?");
        if (confirmDelete) {
            removeTask(taskElement);
        }
    });

    function addTask(description) {
        const taskElement = $("<div>").addClass("task");
        const taskText = $("<span>").text(description);
        const removeButton = $("<button>").text("Remover").addClass("remove-btn");

        taskElement.append(taskText).append(removeButton);
        ftList.prepend(taskElement);
        saveTasks();
    }

    function removeTask(taskElement) {
        taskElement.remove();
        saveTasks();
    }

    function saveTasks() {
        const tasks = ftList.find(".task span").map(function() {
            return $(this).text();
        }).get(); // Get array of task descriptions
        $.cookie("tasks", JSON.stringify(tasks), { expires: 365 });
    }

    function loadTasks() {
        const tasksCookie = $.cookie("tasks");
        if (tasksCookie) {
            const tasks = JSON.parse(tasksCookie);
            $.each(tasks, function(index, task) {
                addTask(task);
            });
        }
    }
});
