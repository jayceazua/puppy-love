const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './public/images/uploads'})
// TODO: Connect to the database
const Puppy = require('../models/puppy');

// TODO: conventional RESTful routing naming

// INDEX
router.get('/', (req, res, next) => {
  // populate all of the User's puppies posted here
  Puppy.find({}).then((puppies) => {
    res.render('puppies/index', {puppies: puppies})
  }).catch((err) => {
    console.log(err.message)
  })
})

// NEW
router.get('/new', (req, res, next) => {
  // fetch the breeds from the database?
  res.render('puppies/new')
})

// CREATE
router.post('/new', upload.single('image'), (req, res, next) => {
  const puppy = new Puppy(req.body);
  //check file upload
  var imageName
  var imagePath

  if (req.file) {
    console.log('Uploading File...')
    imageName = req.file.originalname;
    imagePath = "/images/uploads/" + req.file.filename
  } else {
    console.log('No File Uploaded...')
    imageName = 'noimage.jpg'
    imagePath = "/images/uploads/noimage.jpg"
  }

  puppy.path = imagePath
  puppy.originalFileName = imagePath

  console.log(req.body)
  console.log(req.file.originalname)

  puppy.save().then((puppy) => {

    req.flash('success_msg', 'Saved successfully.')
    res.redirect('/puppies')

  }).catch((err) => {

    res.flash('error_msg', 'Failed to save and redirect.');
    res.redirect('/')
    console.log(err.message)
  });

  // TODO: create another reference to the MongoDB
  //push to that collection
  //save the new object to the database
})

// SHOW
router.get('/:id', (req, res) => {
  Puppy.findById(req.params.id).then((puppy)=> {
    res.render('puppies/show', {puppy})
  }).catch((err) => {
    console.log(err.message)
  })
})

module.exports = router
