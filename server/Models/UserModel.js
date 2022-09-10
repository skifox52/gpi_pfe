const db = require("../config/db")

class UserModel {
  //Fetch all users
  static fetchAllUsers() {
    const query = "SELECT * FROM utilisateur"
    const result = db.execute(query)
    return result
  }
  //Find by Id
  static findById(id) {
    const query =
      "SELECT id_util, code_dep, prenom_util, nom_util, email_util, teleph_mob_util, teleph_util FROM utilisateur WHERE id_util=?"
    const result = db.execute(query, [id])
    return result
  }
  //Update user
  static updateUser(id, { nom, prenom, email, tel_mob, tel }) {
    const query =
      "UPDATE utilisateur SET nom_util=?,prenom_util=?,email_util=?,teleph_mob_util=?,teleph_util=? WHERE id_util=?"
    const result = db.execute(query, [nom, prenom, email, tel_mob, tel, id])
    return result
  }
  //Delete User
  static deleteUser(id) {
    const query = "DELETE FROM utilisateur WHERE id_util=?"
    const result = db.execute(query, [id])
    return result
  }
}

module.exports = UserModel
