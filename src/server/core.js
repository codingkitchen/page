var fs = require("fs");
var express = require("express")
var app = express()

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

module.exports = {readJSON: readJSON}

app.use(express.static('dist'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
