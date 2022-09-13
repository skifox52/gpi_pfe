const db = require("../config/db")

class AuthModel {
  constructor(prenom, nom, mdp, email, telephM, teleph, role) {
    ;(this.prenom = prenom),
      (this.nom = nom),
      (this.mdp = mdp),
      (this.email = email),
      (this.telephM = telephM),
      (this.teleph = teleph),
      (this.role = role)
  }
  save() {
    const query = `INSERT INTO utilisateur(prenom_util, nom_util, mdp_util, email_util, teleph_mob_util, teleph_util,role) VALUES(?,?,?,?,?,?,?)`
    const newUser = db.execute(query, [
      this.prenom,
      this.nom,
      this.mdp,
      this.email,
      this.telephM,
      this.teleph,
      this.role,
    ])
    return newUser
  }

  static fetchUser(id) {
    const query = `SELECT * from utilisateur WHERE id_util=?`
    const user = db.execute(query, [id])
    return user
  }
}

module.exports = AuthModel
