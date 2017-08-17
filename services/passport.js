const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); // ../ up one ./ current
const keys = require('../config/keys');

//gives you access users schema / google
// User is our model class
const User = mongoose.model('users');

//serializeUser generates a identifing piece of info and is used by passport to produce the cookie
//user.id is our iser with the unique id from mongo which includes googleId
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//id is the user.id from serializeUser
//find a user by id
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//passport is using the google 0auth20 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID, //client id can be shared
      clientSecret: keys.googleClientSecret, //secret can not be shared
      callbackURL: '/auth/google/callback', //this is the callback we'll recieve from google
      proxy: true
    },
    //async await checks if we have a user in the database and if not adds a new record
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      //we have a record of existing user
      if (existingUser) {
        return done(null, existingUser);
        console.log(existingUser);
      }
      //we dont have a record make a record, makes the record!
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
