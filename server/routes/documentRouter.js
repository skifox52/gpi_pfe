const DocumentRouter = require("express").Router()
const protect = require("../middleware/ptotect")
const {
  postDocument,
  getDocument,
} = require("../controllers/documentController")

DocumentRouter.post("/", protect, postDocument).get("/", protect, getDocument)

module.exports = DocumentRouter
