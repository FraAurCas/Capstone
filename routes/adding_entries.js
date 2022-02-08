var express = require('express');

var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('adding_entries', { title: 'Adding Entries' });
  });
  
  
module.exports = router;