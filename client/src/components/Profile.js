import React, { useContext, useEffect } from 'react';
import TodoForm from './TodoForm.js';
import TodoList from './TodoList.js';
import { UserContext } from './context/UserProvider.js';

export default function Profile() {
  
  const { getUserTodos } = useContext(UserContext);
  const username = JSON.parse(localStorage.getItem("user")).username;

  useEffect(() => {
    getUserTodos();
  }, []);

  return (
    <div className="profile">
      <h1>Welcome @{username}!</h1>
      <h3>Add A Todo</h3>
      <TodoForm />
      <h3>Your Todos</h3>
      <TodoList />
    </div>
  );
}