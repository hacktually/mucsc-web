var conn = require('./db-ops.js').connection;
var middleware = require('./middleware.js');

module.exports = function(router,app,passport){
	app.get('/', function(req, res) {
		res.render('/index');
	});
	app.get('/blog', function(req, res){
		res.render('/blog');
	});
	app.get('/about', function(req, res){
		res.render('/about');
	});
	app.get('/scoreboard', function(req, res){
		res.render('/scoreboard');
	});
	app.get('/resources', function(req, res){
		res.render('/resources');
	});

	app.get('/adminDash', middleware.isUserAuthenticated, middleware.isAdminUser, function(req, res) {
		res.render('/adminDash', {
			user: req.user
		});
	});
	app.get('/dashboard', middleware.isUserAuthenticated, function(req, res) {
		res.render('/dashboard', {
			user: req.user
		});
	});

	app.get('/auth/google', passport.authenticate('google', {
		scope: ['email', 'profile'] 
	}));
	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		conn.query(`SELECT * FROM mucsc_users WHERE google_id=?`, [req.user.id], function(err, rows){
			if (rows.length == 0) {
				conn.query(`INSERT INTO mucsc_users(google_id, email, fn, ln, img) VALUES (?,?,?,?,?);`, [req.user.id, req.user.email, req.user.name.givenName, req.user.name.familyName, req.user.picture], function(err, rows){
					if (err) { res.send(err); }
				});
			} else {
				conn.query(`UPDATE mucsc_users SET email=?, SET fn=?, SET ln=?, SET img=? WHERE google_id=?;`, 
				[req.user.email, req.user.name.givenName, req.user.name.familyName, req.user.picture, req.user.id], function(err, rows){
					if (err) { res.send(err); }
				});
				res.redirect('/secret');
			}
		});
	});
	
	app.get('/secret', middleware.isUserAuthenticated, (req, res) => {
		res.send(req.user.picture);
	});
	
	app.get('/logout', (req, res) => {
		req.logout(); 
		res.redirect('/');
	});
};

