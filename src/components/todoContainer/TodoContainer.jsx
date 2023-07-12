import { useState } from 'react';
import { v4 } from 'uuid';

const TodoContainer = () => {
	const [todoList, setTodoList] = useState({
		tasks: [],
		tasksToRender: []
	});

	return (
		<>
			<form onSubmit={event => handleSubmit(event, todoList, setTodoList)}>
				<div>
					<input
						aria-label='Create a new todo...'
						type='text'
						name='task'
						placeholder='Create a new todo...'
					/>
				</div>
			</form>
			{todoList.tasksToRender.map(task => (
				<div key={task.id}>
					<input
						type='checkbox'
						name='task'
						id={task.id}
						checked={task.completed}
						onChange={() => changeTodoCompleted(task.id, todoList, setTodoList)}
					/>
					<label htmlFor={task.id}>{task.task}</label>
					<span onClick={() => handleDelete(task.id, todoList, setTodoList)}>
						X
					</span>
				</div>
			))}
			<button onClick={() => filterTasks(todoList, setTodoList, 0)}>All</button>
			<button onClick={() => filterTasks(todoList, setTodoList, 1)}>
				Completed
			</button>
			<button onClick={() => filterTasks(todoList, setTodoList, 2)}>
				Uncompleted
			</button>
		</>
	);
};

const handleDelete = (id, todoList, setTodoList) => {
	const updatedTasks = [];

	todoList.tasks.forEach(task => {
		if (task.id !== id) {
			updatedTasks.push(task);
		}
	});

	// for (let index = 0; index < todoList.tasks.length; index++) {
	// 	if (todoList.tasks[index].id !== id) {
	// 		updatedTasks.push(todoList.tasks[index]);
	// 	}
	// }

	// const updatedTasks2 = todoList.tasks.filter(task => task.id !== id);

	setTodoList({
		tasks: updatedTasks,

		tasksToRender: updatedTasks
	});
};

const handleSubmit = (event, todoList, setTodoList) => {
	event.preventDefault();
	const newTask = {
		id: v4(),
		task: event.target.task.value,
		completed: false
	};
	setTodoList({
		tasks: [...todoList.tasks, newTask],

		tasksToRender: [...todoList.tasks, newTask]
	});
	event.target.reset();
};

const changeTodoCompleted = (id, todoList, setTodoList) => {
	const newTasksItems = todoList.tasks.map(task => {
		if (task.id === id) {
			console.log(task);
			task.completed = !task.completed;
		}

		return task;
	});

	setTodoList({
		tasks: [...todoList.tasks],
		tasksToRender: newTasksItems
	});
};

const filterTasks = (todoList, setTodoList, filter) => {
	let filteredTasks = [...todoList.tasks];

	switch (filter) {
		case 1:
			filteredTasks = todoList.tasks.filter(task => task.completed);
			break;
		case 2:
			filteredTasks = todoList.tasks.filter(task => !task.completed);
			break;
	}

	console.log(filteredTasks);
	setTodoList({
		tasks: [...todoList.tasks],
		tasksToRender: filteredTasks
	});
};

export default TodoContainer;
