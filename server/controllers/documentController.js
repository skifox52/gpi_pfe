const expressAsyncHandler = require("express-async-handler")
const DocumentModel = require("../Models/documentModel")

exports.postDocument = expressAsyncHandler(async (req, res) => {
  try {
    const { categ_doc, commentaire_doc, piece_jointe_doc } = req.body
    if (!categ_doc || !commentaire_doc || !piece_jointe_doc) {
      res.status(400)
      throw new Error("Empty fields!")
    }
    const newDocument = new DocumentModel(
      categ_doc,
      commentaire_doc,
      piece_jointe_doc
    )
    await newDocument.save()
    res.status(201).json("Document created successfully!")
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
