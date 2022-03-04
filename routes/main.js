const e = require('express');
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

to_ranges = function (result) { //Function which turns numerical values to ranges
    for (account of result) {
        if (account.revenue) {
            if (account.revenue <= 500000000) {
                account.revenue = "<$500,000,000"
            } else if (account.revenue <= 1000000000) {
                account.revenue = "$500,000,001 - $1,000,000,000"
            } else if (account.revenue <= 10000000000) {
                account.revenue = "$1,000,000,001 - $10,000,000,000"
            } else if (account.revenue <= 50000000000) {
                account.revenue = "$10,000,000,001 - $50,000,000,000"
            } else {
                account.revenue = ">$50,000,000,001"
            }
        }

        if (account.powerUnits) {
            if (account.powerUnits <= 50) {
                account.powerUnits = "<50";
            } else if (account.powerUnits <= 100) {
                account.powerUnits = "51-100"
            } else if (account.powerUnits <= 500) {
                account.powerUnits = "101-500"
            } else if (account.powerUnits <= 2000) {
                account.powerUnits = "501-2000"
            } else {
                account.powerUnits = ">2001"
            }
        }

        if (account.insurableValue) {
            if (account.insurableValue <= 1000000000) {
                account.insurableValue = "<$1,000,000,000"
            } else if (account.insurableValue <= 10000000000) {
                account.insurableValue = "$1,000,000,001 - $10,000,000,000"
            } else if (account.insurableValue <= 50000000000) {
                account.insurableValue = "$10,000,000,001 - $50,000,000,000"
            } else if (account.insurableValue <= 100000000000) {
                account.insurableValue = "$50,000,000,001 - $100,000,000,000"
            } else {
                account.insurableValue = ">$100,000,000,001";
            }
        }

        if (account.payroll) {
            if (account.payroll <= 10000000) {
                account.payroll = "<$10,000,000"
            } else if (account.payroll <= 100000000) {
                account.payroll = "$10,000,001 - $100,000,000"
            } else if (account.payroll <= 500000000) {
                account.payroll = "$100,000,001 - $500,000,000"
            } else if (account.payroll <= 2000000000) {
                account.payroll = "$500,000,001 - $2,000,000,000"
            } else if (account.payroll <= 10000000000) {
                account.payroll = "$2,000,000,001 - $10,000,000,000"
            } else {
                account.payroll = ">$10,000,000,001"
            }
        }
    }
    return result;
} 

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

    var search_params = ["", "", "", "", "", "", "", "", ""];
    search_params[0] = "%" + (req.query.segment_constraint || '') + "%";
    search_params[1] = "%" + (req.query.region_constraint || '') + "%";
    search_params[2] = "%" + (req.query.industry_constraint || '') + "%";
    search_params[3] = "%" + (req.query.hazardGroup_constraint || '') + "%";
    search_params[4] = "%" + (req.query.revenue_constraint || '') + "%";
    search_params[5] = "%" + (req.query.powerUnits_constraint || '') + "%";
    search_params[6] = "%" + (req.query.insurableValue_constraint || '') + "%";
    search_params[7] = "%" + (req.query.payroll_constraint || '') + "%";
    search_params[8] = "%" + (req.query.catastrophe_constraint || '') + "%";

    console.log(search_params[8]);

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

    query_string += " WHERE segment LIKE ? AND region LIKE ? AND industry LIKE ? AND hazardGroup LIKE ? AND revenue LIKE ? AND powerUnits LIKE ? AND insurableValue LIKE ? AND payroll LIKE ? AND catastrophe LIKE ?"

    /*
    if (segment_constraint !== '') {
        var escaped_search = con.escape(req.query.search); //TODO: This may not work
        query_string += " WHERE industry LIKE '%" + escaped_search.substring(1, escaped_search.length -1) + "%'";
    }
    */

    query_string += ";";

    con.query(query_string,
        search_params,
        function (err, result, fields) {
            if (err) throw err;

            //Make numerical values into ranges used by company
            to_ranges(result)

            res.render('main', { title: 'Policies', array: result, include_segment: include_segment, include_region: include_region, include_industry: include_industry, include_hazardGroup: include_hazardGroup, include_revenue: include_revenue, include_powerUnits: include_powerUnits, include_insurableVaue: include_insurableVaue, include_payroll: include_payroll, include_catastrophe: include_catastrophe});
    });
});


module.exports = router;
