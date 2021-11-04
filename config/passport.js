var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID:           GOOGLE_CLIENT_ID,
        clientSecret:       GOOGLE_CLIENT_SECRET,
        callbackURL:        "http://localhost:8000/auth/google/callback",
        passReqToCallback:  true
    },
    function(req, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
    }
    ));
};