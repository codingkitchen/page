var redis = require("redis")
var uuid = require("node-uuid")
var REDIS_HOST = process.env.DB_PORT_6379_TCP_ADDR || "127.0.0.1"
var REDIS_PORT = process.env.DB_PORT_6379_TCP_PORT || "6379"

var client = redis.createClient(REDIS_PORT, REDIS_HOST)

console.log("redis host:", REDIS_HOST)
console.log("redis port:", REDIS_PORT)

function onRedisConnect() {
  console.log("Redis connection opend!")
}

function storeUser(user, callback) {
  var uuid0 = uuid.v1()
  client.set(uuid0, user, onReply)
  
  function onReply(err, reply) {
    if(err) {
      return callback(err)
    }
    return callback(null, reply)
  }
}

function init() {
  client.on("connect", onRedisConnect)
}

module.exports = {
  init: init,
  storeUser: storeUser
}
