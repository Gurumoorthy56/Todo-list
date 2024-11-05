const button = document.querySelector('#form');
const todoList = document.querySelector('#todolist');
const input = document.querySelector('#input');

let todos = [];

// Load todos from localStorage when the window loads
window.onload = () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo));
};

// Add event listener for the "Add" button
button.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText === '') { alert('Enter A Task To Add!!!'); return }; // Prevent adding empty todos

    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    addTodoToDOM(todoText);
    input.value = ''; // Clear the input field
});

// Function to create and display a todo item in the DOM
function addTodoToDOM(todo) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';

    const para = document.createElement('p');
    para.innerText = todo;

    // Create a delete button for each todo item
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';

    // Event listener for deleting a todo item
    deleteButton.addEventListener('click', () => {
        todoList.removeChild(todoItem);
        remove(todo);
    });

    // Event listener for marking a todo as completed
    // para.addEventListener('click', () => {
    //     para.style.textDecoration = "line-through";
    //     para.classList.add('completed'); // Toggle completed class
    //     setTimeout(() => {
    //         if (para.classList.contains('completed')) {
    //             remove(todo); // Remove from array if completed
    //         } else {
    //             todos.push(todo); // Re-add to array if uncompleted
    //             localStorage.setItem('todos', JSON.stringify(todos));
    //         }
    //     }, 10000);

    //     updateTodoList();
    // });

    // Append elements to the todo item and then to the list
    todoItem.appendChild(para);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
}

// Function to remove a todo from the array and localStorage
function remove(todo) {
    let index = todos.indexOf(todo);
    if (index > -1) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        updateTodoList(); // Update the displayed list after removal
    }
}

// Function to refresh the displayed list of todos
function updateTodoList() {
    todoList.innerHTML = ''; // Clear existing items
    todos.forEach(item => addTodoToDOM(item)); // Re-add all items to the DOM
}

