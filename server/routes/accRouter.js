const accRouter = require("express").Router()
const protect = require("../middleware/ptotect")
const {
  postAccorder,
  fetchCount,
  fetchDetails,
} = require("../controllers/accController")

accRouter
  .get("/count/:id", protect, fetchCount)
  .post("/", protect, postAccorder)
  .get("/details/:id", protect, fetchDetails)

module.exports = accRouter
