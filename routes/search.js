var express = require('express');
var expressHbs = require('express-handlebars');
const { handlebars } = require('hbs');

var router = express.Router();

var hbs = expressHbs.create({
    helpers: require('../helpers/handlebars').helpers,
    defaultLayout: 'layout',
    extname: '.hbs'
});

// const hbsHelpers = require('../helpers/handlebars');

console.log('===============')
console.log(hbs.handlebars.helpers);
var con = require('./database');


router.get('/', function(req,res, next) {
    res.render('search', {title: 'Search', IDVals: ["One", "Two", "Three"]});
}); 


module.exports = router;