const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const expressAsyncHandler = require("express-async-handler")
const AuthModel = require("../Models/authModel")
require("dotenv").config()

//Generate token
const genereateToken = (id) => {
  return jwt.sign(id, process.env.JWT_SECRET)
}

//Register CONTROLLER

exports.registerController = expressAsyncHandler(async (req, res) => {
  try {
    const { prenom, nom, mdp, email, telephM, teleph, role, code_dep } =
      req.body
    if (
      !prenom ||
      !nom ||
      !mdp ||
      !email ||
      !telephM ||
      !teleph ||
      !role ||
      !code_dep
    ) {
      throw new Error("Empty fields!")
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
      teleph,
      role,
      code_dep
    )
    await newUser.save()
    res.status(200).json("User created successfuly")
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})

//Login CONTROLLER

exports.loginController = expressAsyncHandler(async (req, res) => {
  try {
    const { id, password } = req.body
    if (!id || !password) {
      throw new Error("Empty fields!")
    }

    //Fetch for user if exist
    const [user, _] = await AuthModel.fetchUser(id)
    if (user.length == 0) {
      throw new Error("User id not found!")
    }
    const userId = user[0].id_util
    const userName = user[0].nom_util
    const userPassword = user[0].mdp_util
    const role = user[0].role
    const matchedPassword = await bcrypt.compare(password, userPassword)
    if (matchedPassword === false) {
      throw new Error("Password doesn't match!")
    }
    res.status(200).json({
      userId,
      nom_util: userName,
      role: role,
      token: genereateToken(userId),
    })
  } catch (error) {
    res.status(400)
    throw new Error(error)
  }
})
