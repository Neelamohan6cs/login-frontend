import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import external CSS

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    dept: '',
    branch: '',
  });

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:1234/todo/all');
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1234/todo/send', formData);
      setFormData({ name: '', email: '', age: '', dept: '', branch: '' });
      fetchTodos(); // refresh list
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Handle delete button
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1234/todo/delete/${id}`);
      fetchTodos(); // refresh list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <h2>Todo Form</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
        <input name="dept" placeholder="Department" value={formData.dept} onChange={handleChange} />
        <input name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
        <button type="submit">Add Todo</button>
      </form>

      <h3>Todo List</h3>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <div>
              <strong>{todo.name}</strong> ({todo.email}) - {todo.dept}/{todo.branch}
            </div>
            <button onClick={() => handleDelete(todo._id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
vv    </div>
  );
}

export default App;
