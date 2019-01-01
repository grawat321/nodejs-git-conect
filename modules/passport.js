var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var Keys = require('../config/keys');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});


passport.use(new GitHubStrategy({
    clientID: Keys.oauth.clientID,
    clientSecret: Keys.oauth.clientSecret,
    callbackURL: "/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

module.exports = passport;