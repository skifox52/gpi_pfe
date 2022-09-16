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
  static fetchRequest(id) {
    const query =
      "SELECT id_requete, date_requete,nom_mat, heure_requete, type_requete,titre_requete, description_requete, urgence_requete, statut FROM requete, materiel WHERE materiel.id_mat=requete.id_materiel AND id_utilisateur=?;"
    const requests = db.execute(query, [id])
    return requests
  }

  //Fetch all requests
  static fetchAllRequests() {
    const query =
      "select id_requete, nom_util, prenom_util, date_requete, type_requete, heure_requete, titre_requete, description_requete,urgence_requete, statut, id_util , nom_mat from requete, materiel, utilisateur where requete.id_utilisateur = utilisateur.id_util and requete.id_materiel = materiel.id_mat;"
    const result = db.execute(query)
    return result
  }
}

module.exports = RequestModel
