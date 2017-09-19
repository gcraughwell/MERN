const mongoose = require('mongoose');
const { Schema } = mongoose;

//stops people voting mutiple times
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
