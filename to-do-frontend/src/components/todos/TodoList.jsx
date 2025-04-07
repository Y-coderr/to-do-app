"use client"
// and this file shows all list of todos 
import { useContext } from "react"
import { TodoContext } from "../../context/TodoContext"
import TodoItem from "./TodoItem"

const TodoList = () => {
  const { todos, loading, updateTodo, deleteTodo } = useContext(TodoContext)

  if (loading) {
    return <p>Loading todos...</p>    // for loading
  }

  if (todos.length === 0) {
    return <p>No todos found. Add a todo to get started!</p>// if no todo found
  }

  return (
    <div>
      <h2>Your Todos</h2>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      ))}
    </div>
  )
}

export default TodoList

