import React from 'react'
import AddTodoForm from './TodoForm'
import TodoList from './TodoList'
import TotalCompleteItems from './TotalCompleteItems'

export default function App() {
  return (
    <>
    <AddTodoForm/>
    <TodoList/>
    <TotalCompleteItems/>
    </>
  )
}