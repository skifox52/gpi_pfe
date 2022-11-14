const expressAsyncHandler = require("express-async-handler")
const UserModel = require("../Models/UserModel")
const bcrypt = require("bcrypt")

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
        Role: user.role,
        Code_dep: user.code_departement,
        Departement: user.designation_departement,
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
      Nom: user[0].nom_util,
      Prenom: user[0].prenom_util,
      Email: user[0].email_util,
      TelephM: user[0].teleph_mob_util,
      Teleph: user[0].teleph_util,
      Role: user[0].role,
      Departement: user[0].departement,
      Direction: user[0].direction,
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
    let { nom, prenom, email, tel_mob, tel, role, mdp, code_dep } = req.body

    if (!mdp) {
      const [user, _] = await UserModel.updateUserNoPassword(id, {
        nom,
        prenom,
        email,
        tel_mob,
        tel,
        role,
        code_dep,
      })
      res.status(200).json(user)
    } else {
      const hashedPassword = await bcrypt.hash(mdp, 10)
      mdp = hashedPassword
      const [user, _] = await UserModel.updateUser(id, {
        nom,
        prenom,
        email,
        tel_mob,
        tel,
        role,
        mdp,
        code_dep,
      })
      res.status(200).json(user)
    }
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
