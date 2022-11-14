const db = require("../config/db")

class DashboardModel {
  static countInfo() {
    const query = "select count(*) from utilisateur where role='informaticien'"
    const result = db.execute(query)
    return result
  }

  static countUser() {
    const query = "select count(*) from utilisateur where role='utilisateur'"
    const result = db.execute(query)
    return result
  }

  static countAdmin() {
    const query = "select count(*) from utilisateur where role='admin'"
    const result = db.execute(query)
    return result
  }

  static countAccepter() {
    const query = "select count(*) from requete where statut='Accepter'"
    const result = db.execute(query)
    return result
  }

  static countRefuser() {
    const query = "select count(*) from requete where statut='Refuser'"
    const result = db.execute(query)
    return result
  }

  static countEnCours() {
    const query = "select count(*) from requete where statut='En cours'"
    const result = db.execute(query)
    return result
  }

  static countEnAttente() {
    const query = "select count(*) from requete where statut='En attente'"
    const result = db.execute(query)
    return result
  }
}

module.exports = DashboardModel
