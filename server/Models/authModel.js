const db = require("../config/db")

class AuthModel {
  constructor(prenom, nom, mdp, email, telephM, teleph) {
    ;(this.prenom = prenom),
      (this.nom = nom),
      (this.mdp = mdp),
      (this.email = email),
      (this.telephM = telephM),
      (this.teleph = teleph)
  }
  save() {
    const query = `INSERT INTO utilisateur(prenom_util, nom_util, mdp_util, email_util, teleph_mob_util, teleph_util) VALUES(?,?,?,?,?,?)`
    const newUser = db.execute(query, [
      this.prenom,
      this.nom,
      this.mdp,
      this.email,
      this.telephM,
      this.teleph,
    ])
    return newUser
  }

  static fetchUser(name) {
    const query = `SELECT * from utilisateur WHERE nom_util=?`
    const user = db.execute(query, [name])
    return user
  }
}

module.exports = AuthModel
