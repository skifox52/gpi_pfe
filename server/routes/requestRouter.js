const requestRouter = require("express").Router()
const {
  getRequest,
  postRequest,
  getAllRequests,
} = require("../controllers/requestController")
const protect = require("../middleware/ptotect")

requestRouter
  .get("/", protect, getRequest)
  .post("/add", protect, postRequest)
  .get("/all", protect, getAllRequests)

module.exports = requestRouter
