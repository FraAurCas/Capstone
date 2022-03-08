    var express = require('express');
    var expressHbs = require('express-handlebars');
    const { handlebars } = require('hbs');

    var router = express.Router();

    var hbs = expressHbs.create({
        helpers: require('../helpers/handlebars').helpers,
        defaultLayout: 'layout',
        extname: '.hbs'
    });

    var mysql = require('mysql');
    // const hbsHelpers = require('../helpers/handlebars');

    console.log('===============')
    console.log(hbs.handlebars.helpers);
    var con = mysql.createConnection({
        host: "devdb.c9lxwufrjy46.us-east-1.rds.amazonaws.com",
        user: "root",
        password: "Cas2Boh2Mas",
        database: "DevDB"
    });

    con.connect(function (err) {
        if (err) throw err;
    });

    router.get('/', function(req,res, next) {
    res.render('search', {title: 'Search'});
    });


    
    module.exports = router;