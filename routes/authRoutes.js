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
  //caallback URL for google
  app.get('/auth/google/callback', passport.authenticate('google'));

  //logout of the application
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  //get the id f
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
