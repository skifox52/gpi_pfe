const expressAsyncHandler = require("express-async-handler")
const DocumentModel = require("../Models/documentModel")

exports.postDocument = expressAsyncHandler(async (req, res) => {
  try {
    const { categ_doc, commentaire_doc, piece_jointe_doc, id_req } = req.body
    if (!categ_doc || !commentaire_doc || !piece_jointe_doc || !id_req) {
      res.status(400)
      throw new Error("Empty fields!")
    }
    const newDocument = new DocumentModel(
      id_req,
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

exports.getDocument = expressAsyncHandler(async (req, res) => {
  try {
    const [data, _] = await DocumentModel.getDocuments()
    res.status(200).json(data)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
