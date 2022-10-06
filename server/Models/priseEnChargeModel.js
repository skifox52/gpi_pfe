const db = require("../config/db")

class PriseEnCharge {
  constructor(req, info) {
    this.req = req
    this.info = info
  }

  save() {
    const query = "INSERT INTO accorder(id_requete,id_info) VALUES(?,?)"
    const result = db.execute(query, [this.req, this.info])
    return result
  }

  static updateRequest(statut, id_req) {
    const query = "Update requete SET statut=? where id_requete=?"
    const result = db.execute(query, [statut, id_req])
    return result
  }

  static getRequests() {
    const query =
      "SELECT id_requete, nom_mat, type_requete, urgence_requete FROM requete, materiel WHERE requete.id_materiel=materiel.id_mat and requete.statut='En attente'"
    const result = db.execute(query)
    return result
  }

  static getInfo() {
    const query =
      "SELECT id_util,nom_util, prenom_util from utilisateur where role='informaticien'"
    const result = db.execute(query)
    return result
  }
}

module.exports = PriseEnCharge
