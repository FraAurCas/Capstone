var express = require('express');

var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "devdb.c9lxwufrjy46.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "Cas2Boh2Mas",
    database: "DevDB"
});
    
router.get('/', function (req, res, next) {
  if (req.query.submit || false) {
    var entry_ID = Number(req.query.entry_ID || NaN);
    var entry_segment = req.query.entry_segment || "";
    var entry_region = req.query.entry_region || "";
    var entry_industry = req.query.entry_industry || "";
    var entry_hazard = req.query.entry_hazard || "";
    var entry_revenue = req.query.entry_revenue || "";
    var entry_units = req.query.entry_units || "";
    var entry_TIV = req.query.entry_TIV || "";
    var entry_payroll = req.query.entry_payroll || "";
    var entry_exposure = req.query.entry_exposure || "";

    con.query("INSERT INTO devData VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [entry_ID, entry_segment, entry_region, entry_industry, entry_hazard, entry_revenue, entry_units, entry_TIV, entry_payroll, entry_exposure],
      function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    }); 
    res.render('adding_entries', { title: 'Adding Entries' });
  }
  else {
    res.render('adding_entries', { title: 'Adding Entries' });
  }
});
  
  
module.exports = router;