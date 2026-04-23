const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const clearAllBtn = document.getElementById('clear-all');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateTaskCount();
}

function updateTaskCount() {
    const activeTasks = todos.filter(t => !t.completed).length;
    taskCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

function createTodoElement(todo, index) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
        <span class="todo-text">${escapeHTML(todo.text)}</span>
        <button class="delete-btn" onclick="deleteTodo(${index})">&times;</button>
    `;
    
    return li;
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        todoList.appendChild(createTodoElement(todo, index));
    });
    updateTaskCount();
}

function addTodo(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }
}

window.toggleTodo = function(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

window.deleteTodo = function(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

clearAllBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
});

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

todoForm.addEventListener('submit', addTodo);
renderTodos();
