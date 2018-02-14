const path = require('path');
const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const app = express();

// template engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// HOME
app.get('/', (req, res) => {
  Puppy.find({}).then((puppies) => {
    res.render('home', {puppies})
  }).catch((err) => {
    console.log('Failed to load database:', err);
  })
})

// NEW
app.get('/puppies/new', (req, res) => {
  res.render('puppies-new', {});
});

// CREATE
app.post('/puppies', (req, res) => {
  Puppies.create(req.body).then((puppy)=> {
    console.log(puppy)
    res.redirect('/puppies/' + puppy._id)
  }).catch((err) => {
    console.log('Unable to save into the database', err)
  });
})




// Server setup
app.listen(port, () => {
  console.log('Server is listening on port: ' + port);
});
