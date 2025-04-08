const express = require("express")
const router = express.Router()
const todoController = require("../controllers/todoController")
const auth = require("../middleware/auth")

// All routes are protected with auth middleware
router.use(auth)

// @route   GET api/todos
// @desc    Get all todos for a user
// @access  Private
router.get("/", todoController.getTodos)

// @route   POST api/todos
// @desc    Create a new todo
// @access  Private
router.post("/", todoController.createTodo)

// @route   PUT api/todos/:id
// @desc    Update a todo
// @access  Private
router.put("/:id", todoController.updateTodo)

// @route   DELETE api/todos/:id
// @desc    Delete a todo
// @access  Private
router.delete("/:id", todoController.deleteTodo)

module.exports = router

