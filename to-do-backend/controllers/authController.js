const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "User already exists" })
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    })

    // Save user to database
    await user.save()

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    }

    // Sign token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    }

    // Sign token
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
}

