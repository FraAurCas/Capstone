var express = require('express');
var router = express.Router();

//Us connection pools, can make multiple connections at once
var mysql = require('mysql');
var account_data;

var con = mysql.createConnection({
    host: "devdb.c9lxwufrjy46.us-east-1.rds.amazonaws.com",
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
    var include_office = (req.query.include_office || 'true') === 'true';
    var include_broker = (req.query.include_broker || 'true') === 'true';

    //ooh, i need to do something funky to get the params i want

    var query_string = "SELECT name, ";
    if (include_office) {
        query_string += "office, ";
    }
    if (include_broker) {
        query_string += "broker, ";
    }
    query_string += "clientAdvocate, industry, revenue, footprint, limits, losses, retentions FROM test_accounts";
    
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        console.log(query_string);
        res.render('main', { title: 'Policies', array: result, include_office: include_office, include_broker: include_broker });
    });    
});


module.exports = router;

