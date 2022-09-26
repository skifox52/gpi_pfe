const expressAsyncHandler = require("express-async-handler")
const InfoModel = require("../Models/infoModel")

//register
exports.registerInfo = expressAsyncHandler(async (req, res) => {
  try {
    const { cat_info, nom_info, email_info, teleph_info, groupe_info } =
      req.body
    const newInfo = new InfoModel(
      cat_info,
      nom_info,
      email_info,
      teleph_info,
      groupe_info
    )
    const info = await newInfo.save()
    res.status(201).json("Informaticien créer")
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

//Fetch all
exports.fetchInfo = expressAsyncHandler(async (req, res) => {
  try {
    const [result, _] = await InfoModel.fetchAll()
    res.status(200).json(result)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
