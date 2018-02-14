const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let puppySchema = new Schema({
  name: {
    type: String
  },
  gender: {
    type: String
  },
  breed: {
    type: String
  },
  fixed: {
    type: Boolean
  },
  dateOfBirth: {
    type: Date,
    default: Date.now
  }
});

let Puppy = mongoose.model('Puppy', puppySchema);

module.exports = Puppy
