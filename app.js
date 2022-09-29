const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const ObjectID = require("mongodb").ObjectId

//Controllers
const userController = require('./controllers/userController')
const listController = require('./controllers/listController')

//Auth middleware
const auth = require("./utils/auth")

app.use(express.json())

app.post("/register", userController.apiRegister)
app.post("/login", userController.apiLogin)

app.post("/createlist", auth.auth, listController.apiCreateList)
app.post("/addChannel",auth.auth, listController.apiAddChannel)
app.post("/deletelist", auth.auth, listController.apiDeleteList)

module.exports = app