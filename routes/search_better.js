var express = require('express');
var router = express.Router();

var real_constraints = [
    "segment_constraint",
    "region_constraint",
    "industry_constraint",
    "hazardGroup_constraint",
    "revenue_constraint",
    "powerUnits_constraint",
    "insurableValue_constraint",
    "payroll_constraint",
    "catastrophe_constraint"
]
var constraints = [
    "Segment",
    "Region",
    "Industry",
    "Hazard Group",
    "Revenue",
    "Power Units",
    "Insurable Value",
    "Payroll",
    "Catastrophe Exposure"
]
var values = [
    ["Select", "Middle Market", "Large and Complex"],
    ["West", "Northeast", "Southeast", "Midwest"],
    ["Educational", "Automotive", "Chemical", "Construction"],
    ["Low", "Medium", "High", "Very High"],
    [500000000, 1000000000, 10000000000, 50000000000, 50000000001],
    [50, 100, 500, 2000, 2001],
    [1000000000, 10000000000, 50000000000, 100000000000, 100000000001],
    [1000000, 10000000, 100000000, 500000000, 1000000000, 10000000000, 10000000001],
    ["Hurricane", "Earthquake"]
]

/* GET users listing. */
router.get('/', function (req, res, next) {
    var search_params = ["", "", "", "", "", "", "", "", ""];
    search_params[0] = req.query.segment_constraint || ''
    search_params[1] = req.query.region_constraint || ''
    search_params[2] = req.query.industry_constraint || ''
    search_params[3] = req.query.hazardGroup_constraint || ''
    search_params[4] = req.query.revenue_constraint || ''
    search_params[5] = req.query.powerUnits_constraint || ''
    search_params[6] = req.query.insurableValue_constraint || ''
    search_params[7] = req.query.payroll_constraint || ''
    search_params[8] = req.query.catastrophe_constraint || ''
    
    var i = 0;
    while (search_params[i] !== '') {
        i++;
    }

    var redir = i == 8;
    console.log(redir);
    
    res.render('search_better', { param: constraints[i], real_param: real_constraints[i], vals : values[i], redir : redir})
});

module.exports = router;
