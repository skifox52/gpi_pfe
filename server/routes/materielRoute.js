const materielRouter = require("express").Router()
const { fetchMateriel } = require("../controllers/matController")
const protect = require("../middleware/ptotect")

materielRouter.get("/all", protect, fetchMateriel)

module.exports = materielRouter
