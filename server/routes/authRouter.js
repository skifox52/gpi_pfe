const express = require("express")
const protect = require("../middleware/ptotect")

const {
  registerController,
  loginController,
} = require("../controllers/authController")
const authRouter = express.Router()

authRouter
  .post("/register", protect, registerController)
  .post("/login", loginController)

module.exports = authRouter
