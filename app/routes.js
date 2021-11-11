// require('db-ops.js').connection;
// var middleware = require('./middleware.js');
//const passport = require('passport');
var express	= require('express');
//var app		= express();
var middleware = require('./middleware.js');

module.exports = function(router,app,passport){
	router.get('/', function(req, res) {
		res.send('kek!');
	});
	
	app.get('/login', (req, res) => {
		res.render('login.ejs');
	});
	
	// passport.authenticate middleware is used here to authenticate the request
	app.get('/auth/google', passport.authenticate('google', {
		scope: ['profile'] // Used to specify the required data
	}));
	
	// The middleware receives the data from Google and runs the function on Strategy config
	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/secret');
	});
	
	// Secret route
	app.get('/secret', middleware.isUserAuthenticated, (req, res) => {
		res.send('You have reached the secret route');
	});
	
	// Logout route
	app.get('/logout', (req, res) => {
		req.logout(); 
		res.redirect('/');
	});


};

