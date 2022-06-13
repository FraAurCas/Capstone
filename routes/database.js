var mysql = require('mysql');
var con = mysql.createConnection({
    host: "devdb.c9lxwufrjy46.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "Cas2Boh2Mas",
    database: "DevDB"
});
//const { requiresAuth } = require('express-openid-connect');
con.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
  });
  
module.exports = con;