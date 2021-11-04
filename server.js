var http = require('http');
var express = require('express');

var app = express();
var server = http.createServer(app);
// var bodyParser = require('body-parser');

// var engines = require('consolidate');
// app.engine('html', engines.hogan);
// app.set('views', __dirname +'/templates');
// app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({extended: false}));

// require('/app/routes.js')(app);

server.listen(8000);
console.log("Listening at http:localhost:8000");