const express = require('express');
const router = express.Router();

// HOME
router.get('/', (req, res, next) => {
  // fetch ALL the puppies in the data base and populate them here
  res.render('index')
})

// be able to search through the database for a specific dog

module.exports = router
