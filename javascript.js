const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".todoButton");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filterTodo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filter);
document.addEventListener('DOMContentLoaded', getTodos)

function addTodo(event){
    //stops browser from refreshing, prevent form from submitting
    //event.preventDefault();

    //Todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add('todoItem');
    todoDiv.appendChild(newTodo);

    saveLocal(todoInput.value);

    //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completeButton');
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('deleteButton');
    todoDiv.appendChild(deleteButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'deleteButton'){
        const todo = item.parentElement; //allows us to delete the whole todo
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        }); //lets the animation run and then delte item
    }

    if(item.classList[0] === 'completeButton'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filter(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.displey = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";  
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";  
                }
                break;
        }
    });
}

function saveLocal(todo){
    //check for current todos
    let todos;
    if(localStorage.getItem('todos') == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); //how it saves to local storage
}

function getTodos(){ //how we get it back from local storage
    let todos;

    if(localStorage.getItem('todos') == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create list
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;  //this was changed from original function
        newTodo.classList.add('todoItem');
        todoDiv.appendChild(newTodo);

        //checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completeButton');
        todoDiv.appendChild(completedButton);

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('deleteButton');
        todoDiv.appendChild(deleteButton);

        //append to list
        todoList.appendChild(todoDiv);

    });
}

function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText; //get index of whats being deleted.
    todos.splice(todos.indexOf(todoIndex), 1); //how many things we are removing
    localStorage.setItem("todos", JSON.stringify(todos));
}