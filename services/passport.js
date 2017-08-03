const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); // ../ up one ./ current
const keys = require('../config/keys');

//gives you access users schema / google
// User is our model class
const User = mongoose.model('users');

//passport is using the google 0auth20 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID, //client id can be shared
      clientSecret: keys.googleClientSecret, //secret can not be shared
      callbackURL: '/auth/google/callback' //this is the callback we'll recieve from google
    },
    (accessToken, refreshToken, profile, done) => {
      //create  a new user wirh googleId and profile id and save it to the database.
      new User({ googleId: profile.id }).save();

      // console.log('access token', accessToken);
      // console.log('refresh token', refreshToken);
      // console.log('profile', profile);
    }
  )
);
