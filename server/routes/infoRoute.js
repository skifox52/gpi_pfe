const InforRouter = require("express").Router()
const protect = require("../middleware/ptotect")
const { registerInfo, fetchInfo } = require("../controllers/infoController")

InforRouter.post("/", protect, registerInfo).get("/", protect, fetchInfo)

module.exports = InforRouter
