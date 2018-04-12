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
  age: {
    type: Number
  },
  dateOfBirth: {
    type: Date,
    default: Date.now
  },
  // Add an image file key
  path: {
    type: String
  },
  originalFileName: {
    type: String
  }
});

let Puppy = mongoose.model('Puppy', puppySchema);

module.exports = Puppy
