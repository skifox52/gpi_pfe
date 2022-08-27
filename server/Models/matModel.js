const db = require("../config/db")

class MatModel {
  static getMat() {
    const query = "SELECT id_mat,nom_mat, marque_mat FROM materiel"
    const resuslt = db.execute(query)
    return resuslt
  }
}

module.exports = MatModel
