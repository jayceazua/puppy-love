const mongoose = require('mongoose');
const db = mongoose.connection;

// MongoDB URI - could be in a config file
let dbUri = process.env.MONGODB_URI || 'mongodb://localhost/PuppyLoveApp';

mongoose.Promise = global.Promise;
mongoose.connect(dbUri);
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {console.log('Mongo Database connected!')});
