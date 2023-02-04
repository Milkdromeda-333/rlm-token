import React, { useContext, useState } from 'react';
import { UserContext } from './context/UserProvider.js';

// why is this on the outside of the function?
const initInputs = {
  title: "",
  description: "",
  imgUrl: ""
};

export default function TodoForm() {

  const [inputs, setInputs] = useState(initInputs);
  const {addTodo} = useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTodo(inputs);
    setInputs(initInputs);
  }

  const { title, description, imgUrl } = inputs;
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title" />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description" />
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        placeholder="Image Url" />
      <button onClick={handleSubmit}>Add Todo</button>
    </form>
  );
}