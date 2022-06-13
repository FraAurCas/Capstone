var mysql = require('mysql');
var con = mysql.createConnection({
    host: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    user: "XXXXXXXXXXXXXXXX",
    password: "XXXXXXXXXXXXXXXX",
    database: "XXXXXXXXXXXXXXXX"
});
//const { requiresAuth } = require('express-openid-connect');
con.connect(function (err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
  });
  
module.exports = con;