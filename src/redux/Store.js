import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/TodoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer, 
  },
});
