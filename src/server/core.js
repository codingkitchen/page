var fs = require("fs");
var redis = require("redis")
var express = require("express")
var uuid = require("node-uuid")
var mail = require("sendmail")()

var client = redis.createClient()
var app = express()

client.on('connect', function() {
    console.log('Redis connection opened!');
});

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
 app.use(express.static('dist'))
  var server = app.listen(port, onServerStart)

  function onServerStart() {
    var host = server.address().address
    var port = server.address().port
    
    console.log('Server listening at http://%s:%s', host, port)
  }
}

function onRedisReply(err, reply) {
  console.log(reply)
}

module.exports = {
  readJSON: readJSON,
  startAllServices: startAllServices
}

mail({
  from: "konrad@codingkitchen.io",
  to: "johannes.auer@livelycode.com",
  subject: "Welcome to Coding Kitchen",
  content: "This is a test mail for our page!",
  onMailError
})

function onMailError(err, response) {
  if(err) {
    console.log(err)
  }
  console.dir(response)
}
