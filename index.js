const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User'); // needs to be above passport
require('./services/passport');

//mongoose to connect via keys mongo URI
mongoose.connect(keys.mongoURI);

const app = express();
//calls authRoutes and the routing
require('./routes/authRoutes')(app);

// if process.evn.PORT if a point is not already provided use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
