const express = require("express")
const {
  fetchUsers,
  fetchUser,
  updateUser,
} = require("../controllers/userController")
const protect = require("../middleware/ptotect")

const userRouter = express.Router()

userRouter
  .get("/all", protect, fetchUsers)
  .get("/:name", protect, fetchUser)
  .put("/update", protect, updateUser)

module.exports = userRouter
