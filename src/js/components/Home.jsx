import React, { useEffect, useState } from 'react'

const API_URL_BASE = "https://playground.4geeks.com/todo"
const USERNAME = "pedroiszaac"

const Home = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	const createUser = async () => {
		try {

			const response = await fetch(API_URL_BASE + "/users/" + USERNAME, {
				method: "POST",
			});

			if (!response.ok) {
				throw new Error("Ocurrió un error al crear el usuario.");
			}

			const data = response.json()

			console.log(data)

		} catch (error) {
		}
	};


	const getTodos = async () => {

		try {
			const response = await fetch(API_URL_BASE + "/users/" + USERNAME, {
				method: "GET"
			});

			if (response.status == 404) {
				createUser()	
			}

			if (!response.ok) {
				throw new Error("Sucedió un error al consultar el endpoint.");
			}

			const data = await response.json();

			//Podemos hacer con la respuesta lo que necesitemos
			setTodos(data.todos)

		} catch (error) {
			console.log(error)
		}

	};

	const createTodo = async () => {
		try {
			let task = {
				"label": inputValue,
				"is_done": false
			};

			const response = await fetch(API_URL_BASE + "/todos/" + USERNAME, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(task)
			});

			if (!response.ok) {
				throw new Error("Ocurrió un error al crear la tarea.");
			}

			//const data = response.json()

			getTodos();

		} catch (error) {
		}
	};

	const deleteTodo = async (todo_id) => {
		try {
			const response = await fetch(API_URL_BASE + "/todos/" + todo_id, {
				method: "DELETE"
			});
			if (!response.ok) {
				throw new Error("Ocurrió un error eliminando la tarea con id: " + todo_id);

			}

			getTodos();

		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h2>Lista de tareas</h2>
					<input type="text" class="form-control" placeholder="Escribe tu tarea" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => {
						setInputValue(event.target.value);
					}}
						onKeyDown={(event) => {
							if (event.key == "Enter") {
								createTodo();
							}
						}}
					/>
				</div>

			</div>

			<div className="row">
				<div className="col">
					<ul>
						{todos.map((todo, index) => {
							return (
								<div key={todo.id} className='d-flex justify-content-between align-items-center'>
									<li>{todo.label}</li>
									<div>
										<input className="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" />
										<i className="fas fa-trash-alt" onClick={() => {
											deleteTodo(todo.id);
										}}></i>
									</div>
								</div>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Home