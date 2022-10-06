const db = require("../config/db")

class Accorder {
  constructor(id_req, id_inf) {
    this.id_req = id_req
    this.id_inf = id_inf
  }

  save() {
    const query = "INSERT INTO accorder(id_requete, id_info) VALUES(?,?)"
    const result = db.execute(query, [this.id_req, this.id_inf])
    return result
  }

  static countInfo(id) {
    const query = "SELECT COUNT(*) FROM accorder WHERE id_info=?"
    const result = db.execute(query, [id])
    return result
  }

  static getDetails(id) {
    const query =
      "SELECT id_accorder, requete.id_requete, nom_mat, nom_util, prenom_util, role, type_requete, date_requete, heure_requete,date_acc, urgence_requete, statut FROM requete, utilisateur ,materiel, accorder WHERE accorder.id_requete=requete.id_requete AND accorder.id_info = utilisateur.id_util AND materiel.id_mat = requete.id_materiel AND id_info=?"
    const result = db.execute(query, [id])
    return result
  }
}

module.exports = Accorder
