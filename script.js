class Todo {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos")) || [];
        this.todosHtml = document.querySelector(".todos");
        this.emptyImage = document.querySelector(".empty-image");
        this.input = document.querySelector("input");
        this.addButton = document.querySelector(".add-button");

        this.addButton.addEventListener("click", () => this.add());
        this.input.addEventListener("keyup", (e) => this.handleKeyUp(e));

        this.render();
    }

    getTodoHtml(todo, index) {
        let checked = todo.status == "completed" ? "checked" : "";
        return `
        <li class="todo">
            <label for="${index}">
                <input id="${index}" type="checkbox" ${checked} onclick="todoApp.update(${index})">
                <span class="${checked}">${todo.name}</span>
            </label>
            <button class="delete-btn" data-id="${index}" onclick="todoApp.remove(${index})"><i class="fa fa-times"></i></button>
        </li>`;
    }

    render() {
        if (this.todos.length === 0) {
            this.todosHtml.innerHTML = '';
            this.emptyImage.style.display = 'block';
        } else {
            this.todosHtml.innerHTML = this.todos.map(this.getTodoHtml).join('');
            this.emptyImage.style.display = 'none';
        }
    }

    add() {
        const todo = this.input.value.trim();
        if (!todo) return;

        this.todos.unshift({ name: todo, status: "pending" });
        this.input.value = '';
        this.updateLocalStorage();
        this.render();
    }

    update(index) {
        const todo = this.todos[index];
        todo.status = todo.status === "completed" ? "pending" : "completed";
        this.updateLocalStorage();
        this.render();
    }

    remove(index) {
        this.todos.splice(index, 1);
        this.updateLocalStorage();
        this.render();
    }

    handleKeyUp(e) {
        if (e.key === "Enter") {
            this.add();
        }
    }

    updateLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}

// Inisialisasi objek Todo
const todoApp = new Todo();
