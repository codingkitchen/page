var redis = require("redis")
var uuid = require("node-uuid")

var REDIS_URL = process.env.REDIS_URL
var REDIS_HOST = process.env.REDIS_PORT_6379_TCP_ADDR || "127.0.0.1"
var REDIS_PORT = process.env.REDIS_PORT_6379_TCP_PORT || "6379"


function createRedisClient() {

  if(REDIS_URL) {
    return redis.createClient(REDIS_URL)
  } else {
    return redis.createClient(parseInt(REDIS_PORT), REDIS_HOST)
  }
}

var client = createRedisClient()
var client = redis.createClient(parseInt(REDIS_PORT), REDIS_HOST)

function onRedisConnect() {
  console.log("Redis channel opend to ", REDIS_HOST, "on port" , REDIS_PORT)
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
