"use client"
//this component shows to do item
const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const { _id, title, description, status } = todo

  const toggleStatus = () => {
    updateTodo(_id, {
      ...todo,
      status: status === "pending" ? "completed" : "pending",
    })
  }

  return (
    <div className={`todo ${status === "completed" ? "completed" : ""}`}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Status: {status}</p>
      </div>
      <div className="todo-actions">
        <button onClick={toggleStatus} className="btn">
          {status === "pending" ? "Complete" : "Reopen"}
        </button>
        <button onClick={() => deleteTodo(_id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem

