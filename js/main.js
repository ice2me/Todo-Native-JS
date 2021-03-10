//Todo------->>>> Selectors

const todoInput = document.querySelector('.todo-input'),
	todoButton = document.querySelector('.todo-button'),
	todoList = document.querySelector('.todo-list'),
	filterOption = document.querySelector('.filter-todo')

//Todo------->>>> Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Todo------->>>> Functions

function addTodo(e) {
	// prevent form from submitting
	e.preventDefault()
	// DIV todo
	const todoDiv = document.createElement('div')
	todoDiv.classList.add('todo')

	// create li
	const newTodo = document.createElement('li')
	newTodo.innerText = todoInput.value
	newTodo.classList.add('todo-item')
	todoDiv.appendChild(newTodo)

	//Add todo to localStorage
	saveLocalTodos(todoInput.value)
	//check mark button
	const completedButton = document.createElement('button')
	completedButton.innerHTML = '<i class="fas fa-check"></i>'
	completedButton.classList.add('complete-btn')
	todoDiv.appendChild(completedButton)

	//check trash button
	const trashButton = document.createElement('button')
	trashButton.innerHTML = '<i class="fas fa-trash"></i>'
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton)

	// append to list
	todoList.prepend(todoDiv)

	//clear todo input value
	todoInput.value = ''
}
function deleteCheck(e) {
	const item = e.target

	//delete todo item
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement
		//animation
		todo.classList.add('fall')
		removeLocalStorage(todo)
		//wait finish animation
		todo.addEventListener('transitionend', () => {
			todo.remove()
		})

	}

	//check mark
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement
		todo.classList.toggle('completed')
	}
}
//filter todo
function filterTodo(e) {
	const todos = todoList.childNodes
	todos.forEach(todo => {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex'
				break
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
		}
	})
}

function saveLocalTodos(todo) {
	//check
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	todos.push(todo)
	localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLocalStorage(todo){
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	const todoIndex = todo.children[0].innerText
	todos.splice(todos.indexOf(todoIndex), 1)
	localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.forEach((todo) => {
		// DIV todo
	const todoDiv = document.createElement('div')
	todoDiv.classList.add('todo')

	// create li
	const newTodo = document.createElement('li')
	newTodo.innerText = todo
	newTodo.classList.add('todo-item')
	todoDiv.appendChild(newTodo)

	//check mark button
	const completedButton = document.createElement('button')
	completedButton.innerHTML = '<i class="fas fa-check"></i>'
	completedButton.classList.add('complete-btn')
	todoDiv.appendChild(completedButton)

	//check trash button
	const trashButton = document.createElement('button')
	trashButton.innerHTML = '<i class="fas fa-trash"></i>'
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton)

	// append to list
	todoList.prepend(todoDiv)

	//clear todo input value
	todoInput.value = ''
	})
}