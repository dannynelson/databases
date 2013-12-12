var db = require('../../SQL/persistent_server');
var qs = require('querystring');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, x-requested-with",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var statusCode = 200;
var timeStamp = new Date().toISOString();

var addServerProperties = function(msg){
  msg.updatedAt = msg.createdAt = new Date().toISOString();
};

var sendChats = function(req, res){
  statusCode = 200;
  sendResponse(req, res);
};

var addChat = function(req, res){
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    var message = qs.parse(body);
    // var message = JSON.parse(body);

    //process and validate
    console.log(message);
    sendToDb(message);

    statusCode = 201;
    sendResponse(req, res);
  });
};

var sendOptions = function(req, res){
  sendResponse(req, res);
};

var sendResponse = function(req, res){
  res.writeHead(statusCode, headers);
  res.end(null);
};

var sendToDb = function(message){
  addServerProperties(message);
  db.dbConnection.query('INSERT INTO messages SET ?', message, function(err, result) {
    if (err) console.log(err);
  });
}


var verbs = {
  'GET': sendChats,
  'POST': addChat,
  'OPTIONS': sendOptions
};

exports.handleRequest = function(req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);
  if (verbs[req.method]){
    verbs[req.method](req, res);
  } else {
    statusCode = 405;
    sendResponse(req, res);
  }

};
