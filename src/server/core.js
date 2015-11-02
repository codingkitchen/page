var fs = require("fs")
var express = require("express")
var app = express()
var db = require("./database")

/**
 * Reads in JSON file
 * @param path the path to JSON to be read
 * @return callback based on error and exceptions
 */
function readJSON(path, callback) {
  fs.readFile(path, "utf8", onLoad)
  function onLoad(err, data) {
    if (err) {
      return callback(err)
    }

    try{
      parsedData = JSON.parse(data)
    } catch (exception) {
      return callback(exception)
    }
    
    return callback(null, parsedData)
  }
}

/**
 * Starts all server services
 * @param port server port
 * @param staticPath server static path
 */
function startServer(port, staticPath) {
  app.use(express.static(staticPath))
  
  /* Accept post request at /new-user*/
  app.post("/user", onPost)
  
  var server = app.listen(port, onServerStart)

  function onServerStart() {
    var host = server.address().address
    var port = server.address().port
    
    console.log('Server listening at http://%s:%s', host, port)
  }

  function onPost(req, res) {
    console.log("Incoming POST request: ", req)
    console.log("DB:", db.storeUser(req))
    res.send("Thanks for signing up!")
  }
}

module.exports = {
  readJSON: readJSON,
  startServer: startServer
}
