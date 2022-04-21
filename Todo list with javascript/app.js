//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EVENT LISTENERS
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//FUNCTIONS
function addTodo(event){
    // prevent form from submitting
    event.preventDefault();

 //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create li element
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADD TODO LOCAL STORAGE
saveLocalTodos(todoInput.value);
    // create completed buttons
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    // create trash buttons
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

// append to todo-list
    todoList.appendChild(todoDiv);

    //clear todoinput value
    todoInput.value = "";
}

//delete check function

function deleteCheck(e){
    const item = e.target;

    // delete todo
    if(item.classList[0] === 'trash-btn'){
       const todo = item.parentElement;
       //animation
       todo.classList.add('fall');
       removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });
    }

    //check mark
    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function (todo) { 
        const todoStyle = todo.style;  

        if(todoStyle != undefined && todoStyle != null){
            switch (e.target.value) {
                case "all":
                    todoStyle.display = "flex";
                    break;

                case "completed":
                    if (todo.classList.contains('completed')) {
                        todoStyle.display = 'flex';
                    } else {
                        todoStyle.display = "none";
                    }
                    break;

                case "uncompleted":
                    if (todo.classList.contains('completed')){
                        todoStyle.display = 'none';
                    }
                    else{
                        todoStyle.display = "flex";
                    }
                    break;
            }
        }
    });
}

function saveLocalTodos(todo){
    var todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    var todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){

         //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //create li element
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // create completed buttons
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    // create trash buttons
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

// append to todo-list
    todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    var todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem('todos', JSON.stringify(todos));
}