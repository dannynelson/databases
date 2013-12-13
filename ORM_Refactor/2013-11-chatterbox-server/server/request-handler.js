var db = require('../../persistent_server');
var qs = require('querystring');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, x-requested-with",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
};

var sendChats = function(req, res){
  // console.log('DEBUG:', db.Messages)
  db.Messages.findAll().success(function(msgs){
    sendResponse(req, res, 200, JSON.stringify(msgs));
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
  var newMessage = db.Messages.build(message);
  newMessage.save().success(function(){
    console.log("Message successfully posted to SQL database");
  });
};


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
