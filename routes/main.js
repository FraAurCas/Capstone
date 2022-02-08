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
    var include_segment = (req.query.include_segment || 'true') === 'true';
    var include_region = (req.query.include_region || 'true') === 'true';
    var include_industry = (req.query.include_industry || 'true') === 'true';
    var include_hazardGroup = (req.query.include_hazardGroup || 'true') === 'true';
    var include_revenue = (req.query.include_revenue || 'true') === 'true';
    var include_powerUnits = (req.query.include_powerUnits || 'true') === 'true';
    var include_insurableVaue = (req.query.include_insurableVaue || 'true') === 'true';
    var include_payroll = (req.query.include_payroll || 'true') === 'true';
    var include_catastrophe = (req.query.include_catastrophe || 'true') === 'true';

    var query_string = "SELECT ID, ";
    if (include_segment) {
        query_string += "segment, ";
    }
    if (include_region) {
        query_string += "region, ";
    }
    if (include_industry) {
        query_string += "industry, ";
    }
    if (include_hazardGroup) {
        query_string += "hazardGroup, "
    }
    if (include_revenue) {
        query_string += "revenue, "
    }
    if (include_powerUnits) {
        query_string += "powerUnits, "
    }
    if (include_insurableVaue) {
        query_string += "insurableValue, "
    }
    if (include_payroll) {
        query_string += "payroll, "
    }
    if (include_catastrophe) {
        query_string += "catastrophe, "
    }
    query_string = query_string.substring(0, query_string.length - 2); //Remove extraneous comma

    query_string += " FROM devData";

    if (req.query.search || '' !== '') {
        var escaped_search = con.escape(req.query.search); //TODO: This may not work
        query_string += " WHERE industry LIKE '%" + escaped_search.substring(1, escaped_search.length -1) + "%'";
    }

    query_string += ";";

    console.log(query_string);

    con.query(query_string, [],function (err, result, fields) { 
        if (err) throw err;
        res.render('main', { title: 'Policies', array: result, include_segment: include_segment, include_region: include_region, include_industry: include_industry, include_hazardGroup: include_hazardGroup, include_revenue: include_revenue, include_powerUnits: include_powerUnits, include_insurableVaue: include_insurableVaue, include_payroll: include_payroll, include_catastrophe: include_catastrophe});
    });
});


module.exports = router;
