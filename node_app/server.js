const path = require('path');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expValidator = require('express-validator');
const flash = require('connect-flash');
const hbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const app = express();
// Database Connection
require('./db');

// Template Engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

// Logger
app.use(logger('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());


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
require('./routes/users')(app);

// Routes - Middleware
app.use('/', routes);
app.use(puppies);

// SEARCH
const Puppy = require('./models/puppy');
app.get('/search', async (req, res) => {
  const term = new RegExp(req.query.term);
  Puppy.find({
      $or: [{
          'name': term
        },
        {
          'breed': term
        }
      ]
    })
    .then((results) => {
      res.redirect('/puppies')
      });
  })


// let checkAuth = (req, res, next) => {
//     if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
//         req.user = null;
//     } else {
//         let token = req.cookies.nToken;
//         let decodedToken = jwt.decode(token, {complete: true}) || {};
//         req.user = decodedToken.payload;
//     }

//     next();
// };

// app.use(checkAuth);


// Server setup
app.listen(port, () => {
  console.log('Server is listening on port: ' + port);
})
