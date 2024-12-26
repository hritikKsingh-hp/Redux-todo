import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { filterTodo } from "./redux/TodoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos.filteredTodos.length > 0
    ? state.todos.filteredTodos
    : state.todos.todos 
  );
  const dispatch = useDispatch();

  const [searchTask, setSearchTask] = useState("");

  const handleSearchTask = (e) => {
    const searchValue = e.target.value;
    setSearchTask(searchValue);
    dispatch(filterTodo({ title: searchValue }));
  };

  return (
    <div>
      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTask}
          onChange={handleSearchTask}
          className="form-control"
        />
      </div>

      {/* Todo List */}
      <ul className="list-group">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

