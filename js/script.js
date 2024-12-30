const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

const saveData = function () {
  const jsonString = JSON.stringify(toDoData);
  localStorage.setItem("ToDoList", jsonString);
};

const loadData = function () {
  const storedData = localStorage.getItem("ToDoList");
  console.log(storedData);

  if (storedData) {
    toDoData = JSON.parse(storedData);
    render();
  }
};

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      saveData();
      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", function () {
      const index = toDoData.findIndex((obj) => obj.text === item.text);
      toDoData.splice(index, 1);
      saveData();
      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if (headerInput.value.trim().length) {
    const newToDo = {
      text: headerInput.value,
      completed: false,
    };

    toDoData.push(newToDo);
    saveData();
    headerInput.value = "";

    render();
  }
});

loadData();
// localStorage.clear();
