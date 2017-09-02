const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // needs to be above passport
require('./services/passport');

//mongoose to connect via keys mongo URI
mongoose.connect(keys.mongoURI);

const app = express();

//middleware
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
//express will serve up production assets
//like our main.js file, or main.css file 
  app.use(express.static('client/build'));

  //express will serve up index.html file
  //if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// if process.evn.PORT if a point is not already provided use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
