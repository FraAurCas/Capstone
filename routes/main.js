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
});

/* GET main page. */
router.get('/', function (req, res, next) {
    var include_office = (req.query.include_office || 'true') === 'true';
    var include_broker = (req.query.include_broker || 'true') === 'true';
    var include_executive = (req.query.include_executive || 'true') === 'true';
    var include_industry = (req.query.include_industry || 'true') === 'true';
    var include_revenue = (req.query.include_revenue || 'true') === 'true';
    var include_footprint = (req.query.include_footprint || 'true') === 'true';
    var include_limits = (req.query.include_limits || 'true') === 'true';
    var include_losses = (req.query.include_losses || 'true') === 'true';
    var include_retentions = (req.query.include_retentions || 'true') === 'true';

    var query_string = "SELECT name, ";
    if (include_office) {
        query_string += "office, ";
    }
    if (include_broker) {
        query_string += "broker, ";
    }
    if (include_executive) {
        query_string += "clientAdvocate, ";
    }
    if (include_industry) {
        query_string += "industry, "
    }
    if (include_revenue) {
        query_string += "revenue, "
    }
    if (include_footprint) {
        query_string += "footprint, "
    }
    if (include_limits) {
        query_string += "limits, "
    }
    if (include_losses) {
        query_string += "losses, "
    }
    if (include_retentions) {
        query_string += "retentions, "
    }
    query_string = query_string.substring(0, query_string.length - 2); //Remove extraneous comma

    query_string += " FROM test_accounts";

    if (req.query.search || '' !== '') {
        var escaped_search = con.escape(req.query.search); //TODO: This may not work
        query_string += " WHERE name LIKE '%" + escaped_search.substring(1, escaped_search.length -1) + "%'";
    }

    query_string += ";";

    console.log(query_string);

    con.query(query_string, function (err, result, fields) {
        if (err) throw err;
        res.render('main', { title: 'Policies', array: result, include_office: include_office, include_broker: include_broker, include_executive: include_executive, include_industry: include_industry, include_revenue: include_revenue, include_footprint: include_footprint, include_limits: include_limits, include_losses: include_losses, include_retentions: include_retentions});
    });
});


module.exports = router;
