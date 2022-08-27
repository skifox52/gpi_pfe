const db = require("../config/db")

class RequestModel {
  constructor(
    id_util,
    id_mat,
    type_requete,
    date,
    heure,
    titre,
    description,
    urgence
  ) {
    this.id_util = id_util
    this.id_mat = id_mat
    this.type_requete = type_requete
    this.date = date
    this.heure = heure
    this.titre = titre
    this.description = description
    this.urgence = urgence
  }
  //Save a request
  save() {
    const query =
      "INSERT INTO requete (id_utilisateur, id_materiel, type_requete, date_requete, heure_requete, titre_requete, description_requete, urgence_requete) VALUES(?,?,?,?,?,?,?,?)"
    const newRequest = db.execute(query, [
      this.id_util,
      this.id_mat,
      this.type_requete,
      this.date,
      this.heure,
      this.titre,
      this.description,
      this.urgence,
    ])
    return newRequest
  }
  //Fetch request
  static fetchRequest() {
    const query = "SELECT * FROM requete"
    const requests = db.execute(query)
    return requests
  }
}

module.exports = RequestModel
