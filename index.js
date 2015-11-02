var server = require("./src/server/core")
var db = require("./src/server/database")

var STATIC_PATH = __dirname + "/dist"
var SERVER_PORT = process.env.SERVER_PORT

server.startServer(SERVER_PORT, STATIC_PATH)
db.init()
