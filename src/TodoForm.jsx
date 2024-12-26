import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./redux/TodoSlice";

const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    dispatch(addTodo({ title }));
    setTitle(""); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
