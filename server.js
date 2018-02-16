const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expValidator = require('express-validator');
const flash = require('connect-flash');
const hbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const app = express();

// Template Engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Logger
app.use(logger('dev'));
// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Connect Flash
app.use(flash());
// Handle Sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
// Express Validator
app.use(expValidator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}));


// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


/***********
    Routes - Resources
***********/
const routes = require('./routes/index');
const puppies = require('./routes/puppies');
const genres = require('./routes/genres');
const users = require('./routes/users');

// Routes - Middleware
app.use('/', routes);
app.use('/puppies', puppies);
app.use('/genres', genres);
app.use('/users', users);







// Server setup
app.listen(port, () => {
  console.log('Server is listening on port: ' + port);
});
