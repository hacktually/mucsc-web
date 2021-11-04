var http = require('http');
var express = require('express');
var cookieParser= require('cookie-parser');
var app = express();
var passport = require('passport');
// var server = http.createServer(app);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname +'/templates');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

require('./app/routes.js')(app, passport);

var server = app.listen(8000, function() {
    console.log('Listening on 8080');
});