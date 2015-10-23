var fs = require("fs")
var express = require("express")
var mail = require("sendmail")()

var app = express()

function onRedisConnect() {
  console.log("Redis connection opend!")
}

function onRedisReply(err, reply) {
  console.log(reply)
}

function readJSON(path, callback) {
  fs.readFile(path, "utf8", onLoad)
  function onLoad(err, data) {
    if (err) {
      return console.log(err)
    }
    parsedData = JSON.parse(data)
    callback(parsedData)
  }
}

function startAllServices(port) {
  app.use(express.static(__dirname + 'dist'))
  
  var server = app.listen(port, onServerStart)

  function onServerStart() {
    var host = server.address().address
    var port = server.address().port
    
    console.log('Server listening at http://%s:%s', host, port)
  }
}

function onMailError(err, response) {
  if(err) {
    console.log(err)
  }
  console.dir(response)
}

startAllServices(8088)
