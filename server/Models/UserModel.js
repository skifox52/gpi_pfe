const db = require("../config/db")

class UserModel {
  static fetchAllUsers() {
    const query = "SELECT * FROM utilisateur"
    const result = db.execute(query)
    return result
  }
}

module.exports = UserModel
