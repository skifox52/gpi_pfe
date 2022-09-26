const db = require("../config/db")

class InfoModel {
  constructor(cat_info, nom_info, email_info, tel_info, groupe_info) {
    this.cat_info = cat_info
    this.nom_info = nom_info
    this.email_info = email_info
    this.tel_info = tel_info
    this.groupe_info = groupe_info
  }
  //Save
  save() {
    const query =
      "INSERT INTO informaticien(categorie_informaticien, nom_informaticien, email_info, telephone_info, groupe_info) VALUES(?,?,?,?,?)"
    const result = db.execute(query, [
      this.cat_info,
      this.nom_info,
      this.email_info,
      this.tel_info,
      this.groupe_info,
    ])
    return result
  }

  //Fetch all info
  static fetchAll() {
    const query = "SELECT * FROM informaticien"
    const result = db.execute(query)
    return result
  }
}

module.exports = InfoModel
