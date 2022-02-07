var express = require('express');
var router = express.Router();

var mysql = require('mysql');

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
    var include_office = (req.query.include_office || 'false') === 'true';

    var query_string = "SELECT name, "
    if (!include_office) { //Why does this need to be negated?
        query_string += "office, ";
    }
    query_string += "broker, clientAdvocate, industry, revenue, footprint, limits, losses, retentions FROM test_accounts";
    
    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        account_data = result;
        console.log(result);
    });
    
    res.render('main', { title: 'Policies', array: account_data, include_office: include_office });
});


module.exports = router;

