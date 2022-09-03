const MatModel = require("../Models/matModel")
const expressAsyncHandler = require("express-async-handler")

//Fetch all materiel

exports.fetchMateriel = expressAsyncHandler(async (req, res) => {
  try {
    const [mat, _] = await MatModel.getMat()
    res.status(200).json(mat)
  } catch (error) {
    res.status(404)
    throw new Error(error)
  }
})

//Get by categorie
exports.getCategorie = expressAsyncHandler(async (req, res) => {
  try {
    const categorie = req.params.categorie
    const [mat, _] = await MatModel.getCat(categorie)
    res.status(200).json(mat)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
