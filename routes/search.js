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

//Very Jank Recusrion

params = { 
    title: 'Search', 
}

keys = [
    "ID", "segment", "region", "industry", "hazardGroup", "revenue", "powerUnits", "insurableValue", "payroll", "catastrophe"
]

function search_render(depth, req, res, next) { //Recursive function to deal with async stuff
    if (depth === -1) {
        res.render('search', params)
    }
    else {
        con.query("SELECT DISTINCT " + keys[depth] + " FROM stringData", function (err, result, fields) {
            if (err) throw err;

            params[keys[depth]] = [];
            for (var i = 0; i < result.length; i++) {
                params[keys[depth]].push(result[i][keys[depth]])
            }
            
            search_render(depth - 1, req, res, next);
        });
    }
}


router.get('/', function(req, res, next) {
    search_render(keys.length - 1, req, res, next);
}); 


module.exports = router;