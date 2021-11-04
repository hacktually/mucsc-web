var express = require('express');
var passport = require('passport');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index/federated/accounts.google.com', passport.authenticate('google'));

router.get('/oauth2/redirect/accounts.google.com',
  passport.authenticate('google', { assignProperty: 'federatedUser', failureRedirect: '/index' }),
  function(req, res, next) {
      console.log(req.federatedUser.displayName)
          var user = {
            id: row.id.toString(),
            username: row.username,
            displayName: row.name
          };
          req.login(user, function(err) {
            if (err) { return next(err); }
            res.redirect('/');
          });
  });
module.exports = router;