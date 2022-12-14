require("dotenv").config()
const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const requestRouter = require("./routes/requestRouter")
const materielRouter = require("./routes/materielRoute")
const cors = require("cors")
const PriseEnChargeRouter = require("./routes/priseEnChargeRouter")
const accRouter = require("./routes/accRouter")
const PdfRoute = require("./routes/pdfRoute")
const DocumentRouter = require("./routes/documentRouter")
const DashboardRouter = require("./routes/dashboardRouter")

const app = express()

//Setting up middlewares

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
)

//Routes

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/request", requestRouter)
app.use("/materiel", materielRouter)
app.use("/pec", PriseEnChargeRouter)
app.use("/acc", accRouter)
app.use("/pdf", PdfRoute)
app.use("/document", DocumentRouter)
app.use("/dashboard", DashboardRouter)
// Home page

app.get("/", (req, res) => {
  res.status(200).json("Data")
})

//Error handler
app.use(errorHandler)

//App listening

app.listen(process.env.PORT || 5001, () =>
  console.log(`server listening at port ${process.env.PORT}`)
)
