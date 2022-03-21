var express = require('express');
var router = express.Router();
var con = require('./database');
var xlsx = require("xlsx");

router.get('/', function(req, res, next) {
  res.render('adding-entries', { title: 'Adding Entries' });
});
    
router.post('/', function(req, res, next) {

    var entry_ID = Number(req.body.entry_ID || NaN);
    var entry_segment = req.body.entry_segment || "";
    var entry_region = req.body.entry_region || "";
    var entry_industry = req.body.entry_industry || "";
    var entry_hazard = req.body.entry_hazard || "";
    var entry_revenue = req.body.entry_revenue || "";
    var entry_units = req.body.entry_units || "";
    var entry_TIV = req.body.entry_TIV || "";
    var entry_payroll = req.body.entry_payroll || "";
    var entry_exposure = req.body.entry_exposure || "";
  
    con.query("INSERT INTO devData VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [entry_ID, 
          entry_segment, 
          entry_region, 
          entry_industry, 
          entry_hazard, 
          entry_revenue, 
          entry_units, 
          entry_TIV, 
          entry_payroll, 
          entry_exposure],
        function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
    }); 

  res.render('adding-entries', { title: 'Adding-Entries' });
});

module.exports = router;