const DashboardRouter = require("express").Router()
const protect = require("../middleware/ptotect")
const { countUser, countReq } = require("../controllers/DashboardController")

DashboardRouter.get("/countUser", protect, countUser).get(
  "/countReq",
  protect,
  countReq
)

module.exports = DashboardRouter
