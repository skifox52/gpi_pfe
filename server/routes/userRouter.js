const express = require("express")
const { fetchUsers, fetchUser } = require("../controllers/userController")
const protect = require("../middleware/ptotect")

const userRouter = express.Router()

userRouter.get("/all", protect, fetchUsers).get("/:name", protect, fetchUser)

module.exports = userRouter
