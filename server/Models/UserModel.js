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
      "SELECT id_util, prenom_util, nom_util, email_util, teleph_mob_util, teleph_util, role, utilisateur.code_departement, designation_departement as departement, direction  FROM utilisateur, departement WHERE departement.code_departement = utilisateur.code_departement and id_util=?"
    const result = db.execute(query, [id])
    return result
  }
  //Update user
  static updateUser(
    id,
    { nom, prenom, email, tel_mob, tel, role, mdp, code_dep }
  ) {
    const query =
      "UPDATE utilisateur SET nom_util=?,prenom_util=?,email_util=?,teleph_mob_util=?,teleph_util=?, role=?, mdp_util=?, code_departement=? WHERE id_util=?"
    const result = db.execute(query, [
      nom,
      prenom,
      email,
      tel_mob,
      tel,
      role,
      mdp,
      code_dep,
      id,
    ])
    return result
  }
  //Update user without password
  static updateUserNoPassword(
    id,
    { nom, prenom, email, tel_mob, tel, role, code_dep }
  ) {
    const query =
      "UPDATE utilisateur SET nom_util=?,prenom_util=?,email_util=?,teleph_mob_util=?,teleph_util=?, role=?, code_departement=? WHERE id_util=?"
    const result = db.execute(query, [
      nom,
      prenom,
      email,
      tel_mob,
      tel,
      role,
      code_dep,
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
