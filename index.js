var http = require("http");
var fs = require("fs");
var extract = require("./extract");
var wss = require('./websockets-server');
var mime = require("mime");

var handleError = function(err, res) {
  res.writeHead(302, {
    Location: "error.html"
  });
  res.end();
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");
  var url = req.url;
  var fileName = "index.html";
  if (url.length > 1) {
    fileName = url.substring(1);
  }
  console.log(fileName);
  var filePath = extract(req.url);
  var fileType = mime.getType(filePath);
  console.log("The fileType is:", fileType);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });
});
server.listen(3000);
