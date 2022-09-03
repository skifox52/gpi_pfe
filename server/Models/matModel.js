const db = require("../config/db")

class MatModel {
  static getMat() {
    const query = "SELECT * FROM materiel"
    const resuslt = db.execute(query)
    return resuslt
  }
  static getCat(categorie) {
    const query = "SELECT * FROM materiel WHERE categorie=?"
    const result = db.execute(query, [categorie])
    return result
  }
}

module.exports = MatModel
