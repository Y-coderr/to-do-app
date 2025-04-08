const Todo = require("../models/Todo")

// Get all todos for a user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(todos)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, description } = req.body

  try {
    const newTodo = new Todo({
      user: req.user.id,
      title,
      description,
      status: "pending",
    })

    const todo = await newTodo.save()
    res.json(todo)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

// Update a todo
exports.updateTodo = async (req, res) => {
  const { title, description, status } = req.body

  // Build todo object
  const todoFields = {}
  if (title) todoFields.title = title
  if (description) todoFields.description = description
  if (status) todoFields.status = status

  try {
    let todo = await Todo.findById(req.params.id)

    // Check if todo exists
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" })
    }

    // Check if user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    // Update todo
    todo = await Todo.findByIdAndUpdate(req.params.id, { $set: todoFields }, { new: true })

    res.json(todo)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)

    // Check if todo exists
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" })
    }

    // Check if user owns the todo
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" })
    }

    // Delete todo
    await Todo.findByIdAndRemove(req.params.id)

    res.json({ msg: "Todo removed" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

