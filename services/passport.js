const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

//passport is using the google 0auth20 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID, //client id can be shared
      clientSecret: keys.googleClientSecret, //secret can not be shared
      callbackURL: '/auth/google/callback' //this is the callback we'll recieve from google
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);
