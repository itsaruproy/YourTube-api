const User = require("../models/User")
const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {
    try {
        req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
        next()
    } catch(err) {
        res.json({ message: "You are not authorized" })
    }
}