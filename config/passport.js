const env            = require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;
var connection       = require('../app/db-ops.js').connection;

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.mucsc.com/auth/google/callback'
},
  (accessToken, refreshToken, profile, done) => {
      done(null, profile, accessToken); // passes the profile data to serializeUser
  }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

/*
console.log('hit');
    connection.query("SELECT * FROM mucsc_users WHERE google_id=?", [user.id], function(err, rows){
    if (err) { return err; }
    else if (!rows.length) {
      connection.query("INSERT INTO mucsc_users(google_id, email, fn, ln, img) VALUES (?,?,?,?,?)", 
      [user.id,user.email,user.name.givenName,user.name.familyName,user.picture]);
    } else if (rows.length) {
        connection.query("UPDATE mucsc_users SET email=?, SET fn=?, SET ln=?, SET img=? WHERE google_id=?", 
        [user.id,user.email,user.name.givenName,user.name.familyName,user.picture,user.id]);
      }
    });
*/