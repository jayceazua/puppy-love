const express = require('express');
const router = express.Router();
// Add Mongoose Database connection

// TODO: conventional RESTful routing naming

router.get('/', (req, res, next) => {
  res.render('genres/index')
})

router.get('/add', (req, res, next) => {
  res.render('genres/add')
})

router.post('/add', (req, res, next) => {
  const genre = {
    name: req.body.name
  }
  // create another reference to the MongoDB
  //push to that collection
  //save the new object to the database
  console.log(genre)
  req.flash('success_msg', 'Genre Saved.')
  res.redirect('/genres')
})

module.exports = router
