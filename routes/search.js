var express = require('express');
var expressHbs = require('express-handlebars');
const { handlebars } = require('hbs');
var async = require('async');
var con = require('./database');

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
    con.query("SELECT * FROM stringData", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        
    });

    con.query('SELECT * FROM table WHERE col=?', col, function (err, rows) {
        async.each(rows, function (row, callback) {
            con.query('SELECT * FROM other_table WHERE col=?', row.col, callback);
        }, function () {
            // all queries are done
        })
    });
    

    res.render('search', {title: 'Search', IDVals: ["One", "Two", "Three"]});
}); 


module.exports = router;