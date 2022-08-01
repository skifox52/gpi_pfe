const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const expressAsyncHandler = require("express-async-handler")
const AuthModel = require("../Models/authModel")

//Generate token
const genereateToken = (id) => {
  return jwt.sign(id, "jkjflsdlmfsS")
}

//Register CONTROLLER

exports.registerController = expressAsyncHandler(async (req, res) => {
  try {
    const { prenom, nom, mdp, email, telephM, teleph } = req.body
    if (!prenom || !nom || !mdp || !email || !telephM || !teleph) {
      throw new Error("Empty fields!")
    }
    //Fetch for user if exists!
    const [user, _] = await AuthModel.fetchUser(nom)
    if (user.length > 0) {
      throw new Error("User already exists!")
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(mdp, 10)

    //Inserting a user

    const newUser = new AuthModel(
      prenom,
      nom,
      hashedPassword,
      email,
      telephM,
      teleph
    )
    newUser.save()
    const [userId, __] = await AuthModel.fetchUser(newUser.nom)
    res.status(201).json({
      user: newUser.nom,
      token: genereateToken(userId[0].id_util),
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

//Login CONTROLLER

exports.loginController = expressAsyncHandler(async (req, res) => {
  try {
    const { name, password } = req.body
    if (!name || !password) {
      throw new Error("Empty fields!")
    }

    //Fetch for user if exist
    const [user, _] = await AuthModel.fetchUser(name)
    if (user.length == 0) {
      throw new Error("User doesn't exist!")
    }
    const userId = user[0].id_util
    const userName = user[0].nom_util
    const userPassword = user[0].mdp_util
    const matchedPassword = await bcrypt.compare(password, userPassword)
    if (matchedPassword === false) {
      throw new Error("Password doesn't match!")
    }
    res.status(200).json({
      nom_util: userName,
      token: genereateToken(userId),
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
