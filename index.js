/*
 * A simple express app to handle some basic api routes.
 */

var express = require('express');
var common = require('./common.js');

var PORT_NUMBER = 3000;

var app = express();

// GET /
app.get('/', function(req, res) {
  res.send("<p>A simple http server for chef-steps coding challenge.\n\n" +
    "<b>POST /remove-duplicates</b> w/ a payload containing an array of email strings.</p>");
});

// POST /remove-duplicates
app.post('/remove-duplicates', function(req, res) {
  var data = '';

  req.on('readable', function() {
    data += req.read();
  });

  req.on('end', function() {
    var req_body = JSON.parse(data);
    var res_body = '';
    try {
      res_body = common.removeDups(res_body);
    } catch (e) {
      next(e);
    }
    res.send(JSON.stringify(res_body));
  });
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.send(err);
});

app.listen(process.env.PORT || PORT_NUMBER);
