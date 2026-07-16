import React, { useState, useEffect } from "react";
import EditTodo from "./EditTodo";  
const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  // Delete todo function
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        method: "DELETE", 
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get all todos
  const getTodos = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`); 
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5">List of Todos</h1>

      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                
                
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;