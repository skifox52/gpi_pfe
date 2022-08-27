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
