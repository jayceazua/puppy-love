const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('genres/index')
})

module.exports = router
