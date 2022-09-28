const expressAsyncHandler = require("express-async-handler")
const PriseEnCharge = require("../Models/priseEnChargeModel")

//Create pec
exports.createPec = expressAsyncHandler(async (req, res) => {
  try {
    const { request, informaticien } = req.body
    if (!request || !informaticien) throw new Error("Empty fields!")
    const newPec = new PriseEnCharge(request, informaticien)
    await newPec.save()
    await PriseEnCharge.updateRequest("En cours", request)
    res.status(201).json("PEC created!")
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

exports.cancelRequest = expressAsyncHandler(async (req, res) => {
  try {
    const { request } = req.body
    await PriseEnCharge.updateRequest("Refuser", request)
    res.status(203).json("Request had been updated")
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

exports.getRequest = expressAsyncHandler(async (req, res) => {
  try {
    const [data, _] = await PriseEnCharge.getRequests()
    res.status(200).json(data)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

exports.getInfo = expressAsyncHandler(async (req, res) => {
  try {
    const [data, _] = await PriseEnCharge.getInfo()
    res.status(200).json(data)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
