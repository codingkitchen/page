var redis = require("redis")
var uuid = require("node-uuid")

var client = redis.createClient()

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
