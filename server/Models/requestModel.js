const db = require("../config/db")

class RequestModel {
  constructor(
    id_user,
    id_mat,
    type_requete,
    date,
    heure,
    titre,
    description,
    urgence,
    piece_jointe
  ) {
    this.id_user = id_user
    this.id_mat = id_mat
    this.type_requete = type_requete
    this.date = date
    this.heure = heure
    this.titre = titre
    this.description = description
    this.urgence = urgence
    this.piece_jointe = piece_jointe
  }
  //Save a request
  save() {
    const query =
      "INSERT INTO requete (id_utilisateur, id_materiel, type_requete, date_requete, heure_requete, titre_requete, description_requete, urgence_requete, piece_jointe_requete) VALUES(?,?,?,?,?,?,?,?,?)"
    const newRequest = db.execute(query, [
      this.id_user,
      this.id_mat,
      this.type_requete,
      this.date,
      this.heure,
      this.titre,
      this.description,
      this.urgence,
      this.piece_jointe,
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
