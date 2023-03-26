/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const TwitterStrategy = require('passport-twitter');
const user = require('../controller/user');
const passwordUtil = require('./password');
const oauthConfig = require('./oauthconfig');

/*
 In a typical web application, the credentials used to authenticate a user will
 only be transmitted during the login request. If authentication succeeds, 
 a session will be established and maintained via a cookie set in the user's browser.
 Each subsequent request will not contain credentials, but rather the unique cookie 
 that identifies the session. In order to support login sessions, Passport will 
 serialize and deserialize user instances to and from the session. 
 Ref. http://www.passportjs.org/docs/authenticate/
 */
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user.findById(id, function (err, user) {
    done(err, user);
  });
});

/* Authentication */
/*passport.use(new LocalStrategy(
        function (username, password, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // Find the user by username.  If there is no user with the given
                // username, or the password is not correct, set the user to `false` to
                // indicate failure and set a flash message.  Otherwise, return the
                // authenticated `user`.
                user.findByUsername(username, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {message: 'Incorrect username.'});
                    }
                    if (user.password !== password) {
                        return done(null, false, {message: 'Incorrect password.'});
                    }
                    return done(null, user); //  user found valid
                });
            });
        }
));

*/

/* Authentication - Strategy configurations */
passport.use(new LocalStrategy(function (username, password, done) {
  user.findByUsername(username, function (err, profile) {
    if (profile) {
      passwordUtil.validatePassword(password, profile.password, profile.salt, profile.work, function (err, isAuth) {

        if (err) {
          return done(err);
        }
        if (isAuth) {
          if (profile.work < process.env.CRYPTO_WORKFACTOR) {
            user.updatePassword(username, password, process.env.CRYPTO_WORKFACTOR);
          }
          return done(null, profile);
        }
        else {
          return done(null, false, { message: 'Wrong Username or Password' });
        }
      });
    }
    else {
      return done(null, false, { message: 'Wrong Username or Password' });
    }
  });
}));

passport.use(new GoogleStrategy({
  clientID: oauthConfig.Google.clientID,
  clientSecret: oauthConfig.Google.clientSecret,
  callbackURL: oauthConfig.Google.callback
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: oauthConfig.Facebook.appID,
  clientSecret: oauthConfig.Facebook.appSecret,
  callbackURL: oauthConfig.Facebook.callback
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

passport.use(new TwitterStrategy({
  consumerKey: oauthConfig.Twitter.consumerKey,
  consumerSecret: oauthConfig.Twitter.consumerSecret,
  callbackURL: oauthConfig.Twitter.callback
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
}));

exports.passport = passport;