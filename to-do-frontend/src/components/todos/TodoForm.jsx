"use client"
// this component is for to-do form
import { useState } from "react"

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
  })

  const { title, description } = todo

  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === "") {
      return
    }

    addTodo(todo)

    // Clear form
    setTodo({
      title: "",
      description: "",
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Add Todo</h2>
      <div className="form-control">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={onChange} placeholder="Enter todo title" required />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Enter todo description"
        ></textarea>
      </div>
      <input type="submit" value="Add Todo" className="btn btn-block" />
    </form>
  )
}

export default TodoForm

