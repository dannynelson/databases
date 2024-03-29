var db = require('../../persistent_server');
var qs = require('querystring');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, x-requested-with",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var timeStamp = new Date().toISOString();

var addServerProperties = function(msg){
  msg.updatedAt = msg.createdAt = new Date().toISOString();
};

var sendChats = function(req, res){
  db.dbConnection.query('SELECT * FROM messages', function(err, result) {
    if (err) console.log(err);
    // TODO: move sendResponse to here
    sendResponse(req, res, 200, JSON.stringify(result));
  });
};

var addChat = function(req, res){
  var body = '';
  req.on('data', function (data) {
    body += data;
  });
  req.on('end', function () {
    // var message = JSON.parse(body);
    var message = (body[0] === '{') ? JSON.parse(body): qs.parse(body);
    //process and validate
    sendToDb(message);

    sendResponse(req, res, 201, JSON.stringify(message));
  });
};

var sendOptions = function(req, res){
  sendResponse(req, res, 200);
};

var sendResponse = function(req, res, statusCode, body){
  body = body || '{}';
  res.writeHead(statusCode, headers);
  res.end(body);
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
    sendResponse(req, res, 405);
  }

};
