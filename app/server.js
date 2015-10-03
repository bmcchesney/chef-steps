/*
 * A simple http server to handle some basic api routes.
 */
var http = require('http');
var dispatcher = require('httpdispatcher');
var common = require('./common');

var PORT_NUMBER = 8080;

/*
 * Request handler for the server.
 */
function handleRequest(req, res) {
  try {
    console.info(req.method + ' ' + req.url);
    dispatcher.dispatch(req, res);
  } catch(e) {
    console.error(e);
  }
}

/**
 * POST /remove-duplicates
 * req: an array of emails for processing
 * res: an array of emails w/ the duplicate entries removed
 */
dispatcher.onPost("/remove-duplicates", function (req, res) {
  var data = JSON.parse(req.body);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(common.removeDups(data)));
  res.end();
});

var server = http.createServer(handleRequest);

server.listen(
  PORT_NUMBER, 
  function() { 
    console.log('Server has started on port: ' + PORT_NUMBER); 
  });
