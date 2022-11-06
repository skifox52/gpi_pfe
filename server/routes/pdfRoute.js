const PdfRoute = require("express").Router()
const protect = require("../middleware/ptotect")
const { postPdf } = require("../controllers/pdfController")

PdfRoute.post("/", protect, postPdf)

module.exports = PdfRoute
