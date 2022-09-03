const materielRouter = require("express").Router()
const { fetchMateriel, getCategorie } = require("../controllers/matController")
const protect = require("../middleware/ptotect")

materielRouter
  .get("/all", protect, fetchMateriel)
  .get("/cat/:categorie", protect, getCategorie)

module.exports = materielRouter
