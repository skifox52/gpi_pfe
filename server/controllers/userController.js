const expressAsyncHandler = require("express-async-handler")
const UserModel = require("../Models/UserModel")

//Fetch all users

exports.fetchUsers = expressAsyncHandler(async (req, res) => {
  try {
    let allUsers = []
    const [users, _] = await UserModel.fetchAllUsers()
    users.forEach((user) => {
      allUsers.push({
        Id: user.id_util,
        Nom: user.nom_util,
        Prénom: user.prenom_util,
        Email: user.email_util,
        Téléphone: user.teleph_util,
        Téléphone_portable: user.teleph_mob_util,
      })
    })
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

//Fetch one user

exports.fetchUser = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const [user, _] = await UserModel.findById(id)
    res.status(200).json({
      Id: user[0].id_util,
      Code_dep: user[0].code_dep,
      Nom: user[0].nom_util,
      Prenom: user[0].prenom_util,
      Email: user[0].email_util,
      TelephM: user[0].teleph_mob_util,
      Teleph: user[0].teleph_util,
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

//Updata a User
exports.updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const { nom, prenom, email, tel_mob, tel } = req.body
    const [user, _] = await UserModel.updateUser(id, {
      nom,
      prenom,
      email,
      tel_mob,
      tel,
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

//Delete a user
exports.deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id
    const [user, _] = await UserModel.deleteUser(id)
    res.status(204).json(`User ${id} has been deleted`)
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
