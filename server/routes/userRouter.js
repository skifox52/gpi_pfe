const express = require("express")
const { fetchUsers, fetchUser } = require("../controllers/userController")

const userRouter = express.Router()

userRouter.get("/all", fetchUsers).get("/:name", fetchUser)

module.exports = userRouter
