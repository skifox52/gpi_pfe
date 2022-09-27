const InforRouter = require("express").Router()
const protect = require("../middleware/ptotect")
const {
  registerInfo,
  fetchInfo,
  updateInfo,
  deleteInfo,
} = require("../controllers/infoController")

InforRouter.post("/", protect, registerInfo)
  .get("/", protect, fetchInfo)
  .put("/update/:id", protect, updateInfo)
  .delete("/delete/:id", protect, deleteInfo)

module.exports = InforRouter
