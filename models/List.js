const listsCollection = require("../db").db().collection("lists")
const ObjectID = require("mongodb").ObjectId
class List {
    constructor(ownerId, listname, channels = []) {
        this.ownerId = ownerId
        this.listname = listname
        this.channels = channels
    }

    static ifListExists = (ownerId, listname) => {
        return new Promise(async (resolve, reject) => {
            try {
                let docs = await listsCollection.findOne({ownerId: ownerId, listname: listname})
                // console.log(docs)
                resolve(docs)
                
            } catch {
                reject({message: "There was an error" })
            }
        })
    }

    createNewList = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let docs = await List.ifListExists(new ObjectID(this.ownerId).toString(), this.listname)
                if(docs) {
                    reject({message: "List already exists"})
                    return
                }
                await listsCollection.insertOne({ownerId: new ObjectID(this.ownerId).toString(), listname: this.listname, channels: this.channels}) 
                resolve({ message: "List added" })
            } catch {
                reject({ message: "Error creating list" })
            }
        })
    }

    addNewChannel = (newChannelID) => {
        return new Promise(async (resolve, reject) => {
            try {
                this.channels = [...this.channels, newChannelID]
                await listsCollection.findOneAndUpdate(
                {ownerId: this.ownerId, listname: this.listname},
                {
                    $set: {
                        channels: this.channels
                    }
                })

                resolve({ message: "Updated list" })
            } catch(err) {
                reject({ message: "Failed to update list" })
            }

        })
    }
}

module.exports = List