"use client"

import { useContext } from "react"
import { TodoContext } from "../context/TodoContext"
import TodoForm from "../components/todos/TodoForm"
import TodoList from "../components/todos/TodoList"
import Alert from "../components/layout/Alert"

const Dashboard = () => {
  const { addTodo, error, clearError } = useContext(TodoContext)

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {error && <Alert message={error} type="danger" onClose={clearError} />}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div>
          <TodoForm addTodo={addTodo} />
        </div>
        <div>
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

