var express = require('express');
var StaticServer = require('./serve-static')

var app = express();
var staticServer = new StaticServer();

staticServer.setRoot('./public');
app.set('view engine', 'ejs');

app.get('/*', staticServer.requestHandler.bind(staticServer));

app.listen(process.env.PORT || 3000, function() {
  console.log('listening to port', process.env.PORT || 3000);
});

