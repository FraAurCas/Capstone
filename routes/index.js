var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cas2Boh2Mas"
    //,database: "DevDB"
});

function addEntry() { 

console.log("hello world!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

const entry_ID = document.getElementById("entry_ID").value;
const entry_segment = document.getElementById("entry_segment").value;

const entry_region = document.getElementById("entry_region").value;
const entry_industry = document.getElementById("entry_industry").value;

const entry_hazard = document.getElementById("entry_hazard").value;
const entry_revenue = document.getElementById("entry_revenue").value;

const entry_units = document.getElementById("entry_units").value;
const entry_TIV = document.getElementById("entry_TIV").value;

const entry_payroll = document.getElementById("entry_payroll").value;
const entry_exposure = document.getElementById("entry_exposure").value;

var sql = "INSERT INTO test_accounts ("+entry_ID+", "+entry_segment+", "+entry_region+", "+entry_industry+", "+entry_hazard+", "+entry_revenue+", "+entry_units+", "+entry_TIV+", "+entry_payroll+", "+entry_exposure+")";
console.log(sql);

con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
}); 
}


module.exports = router;
