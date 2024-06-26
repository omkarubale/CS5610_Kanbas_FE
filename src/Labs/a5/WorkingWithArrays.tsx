import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
  const API = `${API_BASE}/a5/todos`;
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Todo",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  //   const removeTodo = async (todo: any) => {
  //     const response = await axios.get(`${API}/${todo.id}/delete`);
  //     setTodos(response.data);
  //   };
  const deleteTodo = async (todo: any) => {
    try {
      const response = await axios.delete(`${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };
  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };
  //   const updateTitle = async () => {
  //     const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
  //     setTodos(response.data);
  //   };
  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };
  const updateTodo = async () => {
    try {
      const response = await axios.put(`${API}/${todo.id}`, todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h3>Working with Arrays</h3>

      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>

      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        className="form-control"
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />

      <a className="btn btn-primary" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>

      <h3>Updating an Item in an Array</h3>
      <input
        className="form-control"
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={todo.completed}
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
        <label htmlFor="TodoCompleted" className="form-check-label">
          Todo Completed
        </label>
      </div>
      <input
        className="form-control"
        type="text"
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      {/* <button className="btn btn-primary" onClick={updateTitle}>
        Update Title
      </button> */}
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/completed/${todo.completed}`}
      >
        Update Completed to {todo.completed}
      </a>

      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Update Description to {todo.description}
      </a>

      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>

      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>

      <h3>Deleting from an Array</h3>
      <a
        className="btn btn-primary mb-2"
        onClick={deleteTodo}
        //   href={`${API}/${todo.id}/delete`}
      >
        Delete Todo with ID = {todo.id}
      </a>

      <br />

      <button className="btn btn-primary" onClick={createTodo}>
        Create Todo
      </button>

      <textarea
        className="form-control"
        value={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <input
        className="form-control"
        value={todo.due}
        type="date"
        onChange={(e) =>
          setTodo({
            ...todo,
            due: e.target.value,
          })
        }
      />
      <div className="form-check">
        <input
          className="form-check-input"
          checked={todo.completed}
          type="checkbox"
          onChange={(e) =>
            setTodo({
              ...todo,
              completed: e.target.checked,
            })
          }
        />
        <label className="form-check-label">Completed</label>
      </div>
      <button className="btn btn-primary" onClick={postTodo}>
        Post Todo
      </button>
      <button className="btn btn-primary" onClick={updateTodo}>
        Update Todo
      </button>

      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
      )}

      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            <input checked={todo.completed} type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>

            <button className="btn btn-danger" onClick={() => deleteTodo(todo)}>
              Remove
            </button>
            <button
              className="btn btn-warning"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default WorkingWithArrays;
