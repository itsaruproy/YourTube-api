const User = require("../models/User")

exports.apiRegister = async (req, res) => {
    let user = new User(req.body)
    try {
       await user.register()
       res.json({ message: "Registration successfull" })
    } catch(err) {
        res.json(err)
    }
}

exports.apiLogin = async (req, res) => {
    console.log(req.body)
    let user = new User(req.body)
    try {
        await user.login()
        res.json({ message: "Login Successful", username: user.data.username })   
    } catch(err) {
        res.json(err)
    }
}