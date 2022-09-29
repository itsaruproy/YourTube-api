const dotenv = require("dotenv")
dotenv.config()
const { MongoClient } = require("mongodb")

MongoClient.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if (err) {
    console.log(err)
  }
  console.log("database connceted")
  module.exports = client
  const app = require("./app")
  app.listen(process.env.PORT)
})
