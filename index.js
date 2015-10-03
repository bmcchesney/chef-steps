/*
 * A simple express app to handle some basic api routes.
 */

var express = require('express');
var common = require('./common.js');

var PORT_NUMBER = 3000;

var app = express();

// GET /
app.get('/', function(req, res) {
  res.send(
    "<p>A simple http server for chef-steps coding challenge.</p>" +
    "<p><b>POST /remove-duplicates</b> w/ a payload containing an array of email strings.</p>");
});

// POST /remove-duplicates
app.post('/remove-duplicates', function(req, res, next) {
  var body = '';

  req.on('readable', function() {
    var data = req.read();
    if (data)
      body += data;
  });

  req.on('end', function() {
    var items = JSON.parse(body.trim());
    var res_body = '';
    try {
      res_body = common.removeDups(items);
      res.json(res_body);
    } catch (e) {
      next(e);
    }
  });
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.send(err);
});

app.listen(process.env.PORT || PORT_NUMBER);
