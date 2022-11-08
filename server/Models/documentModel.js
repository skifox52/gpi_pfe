const db = require("../config/db")

class DocumentModel {
  constructor(categ_doc, commentaire_doc, piece_jointe_doc) {
    this.categ_doc = categ_doc
    this.commentaire_doc = commentaire_doc
    this.piece_jointe_doc = piece_jointe_doc
  }

  save() {
    const query =
      "INSERT INTO document(categ_doc, commentaire_doc, piece_jointe_doc) values(?,?,?)"
    const result = db.execute(query, [
      this.categ_doc,
      this.commentaire_doc,
      this.piece_jointe_doc,
    ])
    return result
  }
}

module.exports = DocumentModel
