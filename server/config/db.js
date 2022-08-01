const mysql = require("mysql2")
require("dotenv").config()

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
})

module.exports = db.promise()
