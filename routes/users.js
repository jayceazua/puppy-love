const express = require('express');
const router = express.Router();

// Register
router.get('/register', (req, res, next) => {
  res.render('users/register')
})

// Login
router.get('/login', (req, res, next) => {
  res.render('users/login')
})


module.exports = router
