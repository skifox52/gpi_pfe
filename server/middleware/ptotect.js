const jwt = require("jsonwebtoken")
require("dotenv").config()
const UserModel = require("../Models/UserModel")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const userToken = jwt.verify(token, process.env.JWT_SECRET)
      const [user, _] = await UserModel.findById(userToken)
      req.user = user
      next()
    } catch (error) {
      res.status(401)
      throw new Error("Not authorized, no token!")
    }
  }
  if (!token) {
    res.status(401)
    throw new Error("Unauthorized, no token!")
  }
})

module.exports = protect
