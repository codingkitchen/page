var test = require("tape")
var server = require("../../src/server/core")

test("json reader", function(t) {
  server.readJSON("test/server/test.json", onLoad)

  function onLoad(data) {
    t.looseEqual(data, {foo: "bar"})
    t.end()
  }
})
