var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
/* GET users listing. */
router.get('/', requiresAuth(), (req, res, next) => {
  res.render('users', {title:"User Management"});
});

module.exports = router;
