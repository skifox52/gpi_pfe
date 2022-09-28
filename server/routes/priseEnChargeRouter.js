const PriseEnChargeRouter = require("express").Router()
const {
  getRequest,
  getInfo,
  createPec,
  cancelRequest,
} = require("../controllers/priseEnChargeController")
const protect = require("../middleware/ptotect")

PriseEnChargeRouter.get("/req", protect, getRequest)
  .get("/info", protect, getInfo)
  .post("/", protect, createPec)
  .put("/", protect, cancelRequest)

module.exports = PriseEnChargeRouter
