const RequestModel = require("../Models/requestModel")
const expressAsyncHandler = require("express-async-handler")

//Get all request
exports.getRequest = expressAsyncHandler(async (req, res) => {
  try {
    const [request, _] = await RequestModel.fetchRequest()
    res.status(200).json(request)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

//Post a request
exports.postRequest = expressAsyncHandler(async (req, res) => {
  try {
    const { id_util } = req.user[0]
    const { id_mat, type_requete, titre, description, urgence } = req.body
    const newRequest = new RequestModel(
      id_util,
      id_mat,
      type_requete,
      new Date(),
      `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      titre,
      description,
      urgence
    )
    await newRequest.save()
    res.status(200).json(newRequest)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
