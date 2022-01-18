var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var account_data;


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cas2Boh2Mas",
    database: "DevDB"
});

con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT name, office, broker, clientAdvocate, industry, revenue, footprint, limits, losses, retentions FROM test_accounts", function (err, result, fields) {
        if (err) throw err;
        account_data = result;
    });
});

/* GET main page. */
router.get('/', function (req, res, next) {
    res.render('main', { title: 'Policies', array: account_data });
});


module.exports = router;

