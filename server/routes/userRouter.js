const express = require("express")
const {
  fetchUsers,
  fetchUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController")
const protect = require("../middleware/ptotect")

const userRouter = express.Router()

userRouter
  .get("/all", protect, fetchUsers)
  .get("/:id", protect, fetchUser)
  .put("/update/:id", protect, updateUser)
  .delete("/delete/:id", protect, deleteUser)

module.exports = userRouter
