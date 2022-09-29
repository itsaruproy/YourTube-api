const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const ObjectID = require("mongodb").ObjectId

//Controllers
const userController = require('./controllers/userController')
const listController = require('./controllers/listController')

app.use(express.json())

app.post("/register", userController.apiRegister)
app.post("/login", userController.apiLogin)

app.post("/createlist", listController.apiCreateList)
app.post("/addChannel", listController.apiAddChannel)

module.exports = app