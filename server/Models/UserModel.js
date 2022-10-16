const db = require("../config/db")

class UserModel {
  //Fetch all users
  static fetchAllUsers() {
    const query =
      "select id_util, role, email_util, nom_util,prenom_util, mdp_util, teleph_mob_util, teleph_util, designation_departement,utilisateur.code_departement from utilisateur left join departement on utilisateur.code_departement = departement.code_departement;"
    const result = db.execute(query)
    return result
  }

  //Find by Id
  static findById(id) {
    const query =
      "SELECT id_util, prenom_util, nom_util, email_util, teleph_mob_util, teleph_util FROM utilisateur WHERE id_util=?"
    const result = db.execute(query, [id])
    return result
  }
  //Update user
  static updateUser(id, { nom, prenom, email, tel_mob, tel, role, mdp }) {
    const query =
      "UPDATE utilisateur SET nom_util=?,prenom_util=?,email_util=?,teleph_mob_util=?,teleph_util=?, role=?, mdp_util=? WHERE id_util=?"
    const result = db.execute(query, [
      nom,
      prenom,
      email,
      tel_mob,
      tel,
      role,
      mdp,
      id,
    ])
    return result
  }
  //Update user without password
  static updateUserNoPassword(id, { nom, prenom, email, tel_mob, tel, role }) {
    const query =
      "UPDATE utilisateur SET nom_util=?,prenom_util=?,email_util=?,teleph_mob_util=?,teleph_util=?, role=? WHERE id_util=?"
    const result = db.execute(query, [
      nom,
      prenom,
      email,
      tel_mob,
      tel,
      role,
      id,
    ])
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
