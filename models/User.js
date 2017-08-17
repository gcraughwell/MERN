const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema; they are the same.

const userSchema = new Schema({
  googleId: String
  // twitterId: String
});

//loads the schema into mongo
//two arguments trying to load something into mongo one means try to pull data
mongoose.model('users', userSchema);
