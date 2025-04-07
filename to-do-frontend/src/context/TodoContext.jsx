"use client"

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "./AuthContext"

export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { isAuthenticated } = useContext(AuthContext)

  // Loading todos when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      getTodos()
    } else {
      setTodos([])
      setLoading(false)
    }
  }, [isAuthenticated])

  // Get all todos
  const getTodos = async () => {
    try {
      setLoading(true)
      const res = await axios.get("http://localhost:5000/api/todos")
      setTodos(res.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to fetch todos")
    } finally {
      setLoading(false)
    }
  }

  // Add todo
  const addTodo = async (todo) => {
    try {
      const res = await axios.post("http://localhost:5000/api/todos", todo)
      setTodos([res.data, ...todos])
      return true
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add todo")
      return false
    }
  }

  // Update todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo)
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)))
      return true
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to update todo")
      return false
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`)
      setTodos(todos.filter((todo) => todo._id !== id))
      return true
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to delete todo")
      return false
    }
  }

  // Clear errors
  const clearError = () => {
    setError(null)
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        getTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        clearError,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

