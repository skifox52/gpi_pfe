const db = require("../config/db")

class DocumentModel {
  constructor(id_req, categ_doc, commentaire_doc, piece_jointe_doc) {
    this.id_req = id_req
    this.categ_doc = categ_doc
    this.commentaire_doc = commentaire_doc
    this.piece_jointe_doc = piece_jointe_doc
  }

  save() {
    const query =
      "INSERT INTO document(id_req, categ_doc, commentaire_doc, piece_jointe_doc) values(?,?,?,?)"
    const result = db.execute(query, [
      this.id_req,
      this.categ_doc,
      this.commentaire_doc,
      this.piece_jointe_doc,
    ])
    return result
  }

  static getDocuments() {
    const query = "SELECT * FROM document"
    const result = db.execute(query)
    return result
  }
}

module.exports = DocumentModel
