const form = document.querySelector(".todo-search");
const addinput = document.querySelector(".todo-search input");
const addbutton = document.querySelector(".todo-search button");
const card = document.querySelector(".card");
const clear = document.querySelector(".card a");
const listsearch = document.querySelector(".list-search > input");
const listgroup = document.querySelector(".list-group");
const alerts = document.querySelector(".alert");

let todos = [];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo) => {
            const html = `
                <li class="list-group-item">
                    <span>${todo}</span>
                    <a href="#" class="remove">
                        <i class="fa fa-remove"></i>
                    </a>
                </li>
            `;
            listgroup.innerHTML += html;
        });
    }

    setFormMargin();
});

addinput.addEventListener("keyup", (e) => {
    if (e.target.value >= 0) {
        addbutton.setAttribute("disabled", true);
    } else {
        addbutton.removeAttribute("disabled");
    }
});

function setFormMargin() {
    form.style.marginTop = todos.length > 0 ? "2vh" : "40vh";
}

form.addEventListener("submit", (e) => {
    let inputText = addinput.value.trim();

    if (inputText != null || inputText != "") {
        let html = `
        <li class="list-group-item">
            <span>${inputText}</span>
            <a href="#" class="remove">
                <i class="fa fa-remove"></i>
            </a>
        </li>
        `;
        showAlert("warning", "List added successfully");
        listgroup.innerHTML += html;
        todos.push(inputText);
        localStorage.setItem("todos", JSON.stringify(todos));
        setFormMargin();
    }

    addinput.value = "";
    e.preventDefault();
    card.classList.remove("d-none");
});

card.addEventListener("click", (e) => {
    let items = e.target.parentElement;
    if (items.classList.contains("remove")) {
        showAlert("danger", "List deleted successfully");
        items.parentElement.remove();
        const todoText = items.parentElement.firstElementChild.textContent;
        todos = todos.filter((todo) => todo !== todoText);

        localStorage.setItem("todos", JSON.stringify(todos));

        setFormMargin();

        if (todos.length === 0) {
            card.classList.add("d-none");
        }
    }
});

listsearch.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredTodos = todos.filter(todo => todo.toLowerCase().includes(searchText));
    updateTodoList(filteredTodos);
});

function updateTodoList(todoList) {
    listgroup.innerHTML = '';
    todoList.forEach(todo => {
        const html = `
            <li class="list-group-item">
                <span>${todo}</span>
                <a href="#" class="remove">
                    <i class="fa fa-remove"></i>
                </a>
            </li>
        `;
        listgroup.innerHTML += html;
    });
}

clear.addEventListener("click", () => {
    listgroup.innerHTML = "";
    card.classList.add("d-none");
    addinput.removeAttribute("disabled");
    localStorage.removeItem("todos");
    window.location.reload(false)
});

const showAlert = (type, message) => {
    let html = `
    <div class="alert-${type}">
        ${message}
    </div>`;
    alerts.innerHTML = html;
    setTimeout(() => {
        alerts.innerHTML = '';
    }, 2500);
}
