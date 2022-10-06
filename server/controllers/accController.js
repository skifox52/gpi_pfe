const expressAsyncHandler = require("express-async-handler")
const Accorder = require("../Models/accModel")

exports.postAccorder = expressAsyncHandler(async (req, res) => {
  try {
    const { id_req, id_info } = req.body
    if (!id_req || !id_info) throw new Error("Empty fields!")
    const newAcc = new Accorder(id_req, id_info)
    await newAcc.save()
    res.status(201).json("Created!")
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

exports.fetchCount = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    if (!id) throw new Error("Empty fields!")
    const [count, _] = await Accorder.countInfo(id)
    res.status(200).json(count)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

exports.fetchDetails = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    if (!id) throw new Error("Empty fields!")
    const [details, _] = await Accorder.getDetails(id)
    res.status(200).json(details)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
