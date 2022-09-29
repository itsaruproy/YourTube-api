const usersCollection = require("../db").db().collection("users")
const ObjectID = require("mongodb").ObjectId


class User {
    constructor(data) {
        this.data = data
    }


    register = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await usersCollection.insertOne(this.data)
                resolve()
            } catch {
                reject({ message: "Error registering the user "})
            }
        })
    }

    login = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const attemptedUser = await usersCollection.findOne({ username: this.data.username })
                if(attemptedUser.password === this.data.password) {
                    resolve()
                } else {
                    reject({ message: "Invalid password" })
                }
            } catch {
                reject({ message: "Please try again later" })
            }
        })
    }

    static findByUsername = (username) => {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await usersCollection.findOne({ username: username })
                user = {
                    _id: new ObjectID(user._id).toString(),
                   username: user.username
                }

                resolve(user)
            } catch {
                reject({ message: "Couldn't find user" })
            }
        })
    }
}

module.exports = User