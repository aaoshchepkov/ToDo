'use strict';

const todoControl = document.querySelector('.todo-control');
let headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
let btnTodoComplete = document.querySelector('.header-button');


let todoData = [

];

document.addEventListener('keydown', function () {
  if (headerInput.value === '') {
    btnTodoComplete.disabled = true;
  } else {
    btnTodoComplete.disabled = false;
  }
});
document.addEventListener('mousedown', function () {
  if (headerInput.value === '') {
    btnTodoComplete.disabled = true;
  } else {
    btnTodoComplete.disabled = false;
  }
});


let saveStorage = function(){
localStorage.todoList = JSON.stringify(todoData);
};
let getStorage = function(){
   if (localStorage.todoList) {
    todoData = JSON.parse(localStorage.todoList);
   }else { todoData = [];}
  };

const render = function () {
  headerInput.value = '';
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.prepend(li);
    } else {
      todoList.prepend(li);
    }

    const todoRemove = li.querySelector('.todo-remove');

    todoRemove.addEventListener("click", function (e){ 
      const text = li.querySelector(".text-todo"); 
      todoData = todoData.filter(function(e) {
      return e.value !== text.innerHTML;
      }); 
      saveStorage();
      render(); 
    });

    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      saveStorage();
      render();
     
    });
  });
};


todoControl.addEventListener('submit', function (event) {
  event.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  saveStorage();
  render();
});

getStorage();
render();



