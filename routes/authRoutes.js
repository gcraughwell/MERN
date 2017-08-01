const passport = require('passport');

// anyone hitting this route /auth/google we want passport to authenciate with the google strategy
//google is built with GoogleStrategy
//scope tells google servers what access we want to have
//app is the argument passed to the function
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));
};
