const requestRouter = require("express").Router()
const { getRequest, postRequest } = require("../controllers/requestController")
const protect = require("../middleware/ptotect")

requestRouter.get("/", protect, getRequest).post("/add", protect, postRequest)

module.exports = requestRouter
