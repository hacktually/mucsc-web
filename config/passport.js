var LocalStrategy    = require( 'passport').Strategy;
const env            = require('dotenv').config();
const mysql          = require('mysql');
const express        = require('express');
const app            = express();
const session        = require('express-session')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport	     = require('passport');

module.exports = function(passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.mucsc.com/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    done(null, profile); // passes the profile data to serializeUser
}
));

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
done(null, user);
});
};