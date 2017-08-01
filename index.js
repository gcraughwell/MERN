const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app);

// if process.evn.PORT if a point is not already provided use 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
