const List = require("../models/List")
const User = require("../models/User")

exports.apiCreateList = async (req, res) => {
    /* req = {
        username: Arup
        listname: dev
    }*/
    try {
        const userDetails = await User.findByUsername(req.body.username)
        let list = new List(userDetails._id, req.body.listname)
        await list.createNewList()
        res.json({ message: "New List created"})
    } catch(err) {
        res.json(err)
    }

}

exports.apiAddChannel = async (req, res) => {
    /*
        user must be logged in check, then in the request parameter set the credentials for that user
        req = {
            username:
            id:
            channel_list_id:

            ... after verifying
        }
    */
    try {
        // 1. find list
        // 2. create list object
        // 3. mutate channels
        const doc = List.ifListExists(req.body._id, req.body.listname)
        if(!doc) {
            res.json({ message: "List does not exist" })
            return
        }

        const list = new List(req.body._id, req.body.listname, doc.channels)
        await list.addNewChannel(req.body.newChannelID)
        res.json({ message: "New Channel added to list" })
    } catch(err) {
        res.json({ message: "Error occurred" })
    }
}