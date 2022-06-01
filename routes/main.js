const { json } = require('body-parser');
const e = require('express');

var express = require('express');
var router = express.Router();
var app = require('../app');
//-------------------this below
const { requiresAuth } = require('express-openid-connect');

//Us connection pools, can make multiple connections at once
var account_data;

var con = require('./database');

/* GET main page. */
router.get('/', requiresAuth(), (req, res, next) => {
    var include_segment = (req.query.include_segment || 'true') === 'true';
    var include_region = (req.query.include_region || 'true') === 'true';
    var include_industry = (req.query.include_industry || 'true') === 'true';
    var include_hazardGroup = (req.query.include_hazardGroup || 'true') === 'true';
    var include_revenue = (req.query.include_revenue || 'true') === 'true';
    var include_powerUnits = (req.query.include_powerUnits || 'true') === 'true';
    var include_insurableVaue = (req.query.include_insurableVaue || 'true') === 'true';
    var include_payroll = (req.query.include_payroll || 'true') === 'true';
    var include_catastrophe = (req.query.include_catastrophe || 'true') === 'true';

    var search_params = ["", "", "", "", "", "", "", "", "", ""];
    search_params[0] = "%" + (req.query.ID_constraint || '') + "%";
    search_params[1] = "%" + (req.query.segment_constraint || '') + "%";
    search_params[2] = "%" + (req.query.region_constraint || '') + "%";
    search_params[3] = "%" + (req.query.industry_constraint || '') + "%";
    search_params[4] = "%" + (req.query.hazardGroup_constraint || '') + "%";
    search_params[5] = "%" + (req.query.revenue_constraint || '') + "%";
    search_params[6] = "%" + (req.query.powerUnits_constraint || '') + "%";
    search_params[7] = "%" + (req.query.insurableValue_constraint || '') + "%";
    search_params[8] = "%" + (req.query.payroll_constraint || '') + "%";
    search_params[9] = "%" + (req.query.catastrophe_constraint || '') + "%";

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

    query_string += " FROM stringData";

    query_string += " WHERE ID LIKE ? AND segment LIKE ? AND region LIKE ? AND industry LIKE ? AND hazardGroup LIKE ? AND revenue LIKE ? AND powerUnits LIKE ? AND insurableValue LIKE ? AND payroll LIKE ? AND catastrophe LIKE ?"

    /*
    if (segment_constraint !== '') {
        var escaped_search = con.escape(req.query.search); //TODO: This may not work
        query_string += " WHERE industry LIKE '%" + escaped_search.substring(1, escaped_search.length -1) + "%'";
    }
    */

    query_string += "ORDER BY ID ASC;";

    con.query(query_string,
        search_params,
        function (err, result, fields) {
            if (err) throw err;

            res.render('main', { title: 'Policies', array: result, include_segment: include_segment, include_region: include_region, include_industry: include_industry, include_hazardGroup: include_hazardGroup, include_revenue: include_revenue, include_powerUnits: include_powerUnits, include_insurableVaue: include_insurableVaue, include_payroll: include_payroll, include_catastrophe: include_catastrophe});
    });
});


router.post('/', async function (req, res, next) {
    await console.log(req.body)
    await con.query('DELETE FROM stringData WHERE ID = \'' + req.body.name + '\'',

    function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");

    });
});


module.exports = router;
