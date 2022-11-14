const DashboardModel = require("../Models/dashboardModel")
const expressAsyncHandler = require("express-async-handler")

exports.countUser = expressAsyncHandler(async (req, res) => {
  try {
    const [infoCount, _] = await DashboardModel.countInfo()
    const [userCount, __] = await DashboardModel.countUser()
    const [adminCount, ___] = await DashboardModel.countAdmin()

    res.status(200).json({
      infoCount: infoCount[0],
      userCount: userCount[0],
      adminCount: adminCount[0],
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

exports.countReq = expressAsyncHandler(async (req, res) => {
  try {
    const [accepterCount, _] = await DashboardModel.countAccepter()
    const [refuserCount, __] = await DashboardModel.countRefuser()
    const [enAttenteCount, ___] = await DashboardModel.countEnAttente()
    const [enCoursCount, ____] = await DashboardModel.countEnCours()

    res.status(200).json({
      accepterCount: accepterCount[0],
      refuserCount: refuserCount[0],
      enAttenteCount: enAttenteCount[0],
      enCoursCount: enCoursCount[0],
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
