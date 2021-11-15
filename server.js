var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon')
var path = require('path')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const dotenv = require('dotenv');
dotenv.config()

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.keyVal]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')))

var port = process.env.PORT || 3000;
const router = express.Router();

require('./config/passport')(passport);
require('./app/routes.js')(router, app, passport);

app.use('/', router);
app.listen(port);
console.log('Listening on port ' + port);
