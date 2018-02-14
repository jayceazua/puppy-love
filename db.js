const mongoose = require('mongoose');
const db = mongoose.connection;


// MongoDB URI - could be in a config file
let dbUri = process.env.MONGODB_URI || 'mongodb://localhost/PuppyLoveApp';

mongoose.Promise = global.Promise;
mongoose.connect(dbUri);
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {console.log('We are connected!')});

// Model Schema
var Puppy = require('./models/puppy');



var choco = new Puppy({
  name: 'Thor',
  gender: 'Male',
  breed: 'American Staffordshire Terrier',
  fixed: false,
  age: 5
});

choco.save((err, choco) => {
  if (err) return console.error(err);
  console.log('saved!')
})
