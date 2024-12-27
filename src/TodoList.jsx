import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { filterTodo } from "./redux/TodoSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const TodoList = () => {
  const todos = useSelector((state) =>
    state.todos.filteredTodos.length > 0 ? state.todos.filteredTodos : state.todos.todos
  );
  const dispatch = useDispatch();

  const [searchTask, setSearchTask] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState([]);

  useEffect(() => {
    setVisibleTodos(todos.slice(0, 10))
    setHasMore(todos.length > 10)
  }, [todos]);

  const handleSearchTask = (e) => {
    const searchValue = e.target.value;
    setSearchTask(searchValue);
    dispatch(filterTodo({ title: searchValue }));
    setHasMore(true)
  };

  const fetchMoreData = () => {
    if (visibleTodos.length >= todos.length) {
      setHasMore(false)
      return;
    }

    setTimeout(() => {
      setVisibleTodos((prevTodos) =>
        prevTodos.concat(todos.slice(prevTodos.length, prevTodos.length + 10))
      );
    }, 500);
  };

  return (
    <div className="mb-4">
      {/* Search Box */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTask}
          onChange={handleSearchTask}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Scrollable Todo List */}
      <div className="no-scrollbar scroll-smooth overflow-y-auto h-[510px]" id="scrollableDiv">
        <InfiniteScroll
          dataLength={visibleTodos.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div class="flex justify-center items-center mt-8">
            <button 
              disabled 
              type="button" 
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg 
                aria-hidden="true" 
                role="status" 
                class="inline w-4 h-4 me-3 text-white animate-spin" 
                viewBox="0 0 100 101" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                  fill="#E5E7EB" 
                />
                <path 
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
                  fill="currentColor" 
                />
              </svg>
              Loading...
            </button>
          </div>
          }
          endMessage={<p className="text-gray-400 text-center mt-5">No more tasks to show</p>}
          scrollableTarget="scrollableDiv"
        >
          <ul className="list-group">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
              />
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TodoList;
