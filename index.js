/*
 * A simple express app to handle some basic api routes.
 */

var express = require('express');
var common = require('./common.js');

var PORT_NUMBER = 3000;

var app = express();

// GET /
app.get('/', function(req, res) {
  res.send("A simple http server for chef-steps coding challenge.\n" +
    "POST /remove-duplicates w/ a payload containing an array of email strings");
});

// POST /remove-duplicates
app.post('/remove-duplicates', function(req, res) {
  var data = '';

  req.on('readable', function() {
    data += req.read();
  });

  req.on('end', function() {
    var res_body = JSON.parse(data);
    res.send(JSON.stringify(common.removeDups(res_body)));
  });
  
});

app.listen(process.env.PORT || PORT_NUMBER);
