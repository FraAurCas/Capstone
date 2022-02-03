var mysql = require('mysql');

var con = mysql.createConnection({
    host: "devdb.c9lxwufrjy46.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "Cas2Boh2Mas",
    database: "DevDB"
});

con.connect(function (err) {
    var sql = "INSERT INTO test_accounts (id, name, office, broker, clientAdvocate, industry, revenue, footprint, limits, losses, retentions) VALUES (2, 'Fairleigh Dickinson University', 'Hackensack Ave', 'FDU Broker', 'FDU Advocate', 'FDU Industry', 93, 3, 83000, 11, 32)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});
