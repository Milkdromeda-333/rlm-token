import React, { useContext } from 'react';
import Todo from './Todo.js';
import { UserContext } from './context/UserProvider';

export default function TodoList() {

  const { todos } = useContext(UserContext)

  return (
    <div className="todo-list">
      {
        todos.length === 0 ? <p>No to-do's yet.</p> :
          todos.map(item => <Todo key={ item._id } {...item} />)
      }
    </div>
  );
}