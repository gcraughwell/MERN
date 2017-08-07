const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // needs to be above passport
require('./services/passport');

//mongoose to connect via keys mongo URI
mongoose.connect(keys.mongoURI);

const app = express();

//cookie will last 30days in milliseconds
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//calls authRoutes and the routing
require('./routes/authRoutes')(app);

// if process.evn.PORT if a point is not already provided use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
