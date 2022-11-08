const DocumentRouter = require("express").Router()
const protect = require("../middleware/ptotect")
const { postDocument } = require("../controllers/documentController")

DocumentRouter.post("/", protect, postDocument)

module.exports = DocumentRouter
