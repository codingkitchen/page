var server = require("./src/server/core")
var db = require("./src/server/database")

var STATIC_PATH = __dirname + "/dist"

server.startServer(8080, STATIC_PATH)
db.init()
