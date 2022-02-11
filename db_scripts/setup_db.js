var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cas2Boh2Mas"
    //,database: "DevDB"
});

con.connect(function (err) {
    if (err) throw err;
    
    con.query("CREATE DATABASE DevDB", function (err, result) {
        if (err) {
            console.log("Connected to Database!")
        } else {
            console.log("Database created");
        }
    });

    var sql = "CREATE TABLE test_accounts (id INT(255), name VARCHAR(255), office VARCHAR(255), broker VARCHAR(255), clientAdvocate VARCHAR(255), industry VARCHAR(255), revenue INT(255), footprint INT(255), limits INT(255), losses INT(255), retentions INT(255))";
    con.query(sql, function (err, result) {
        if (err) {
            console.log("Connected to table!")
        } else {
        console.log("Table created");
        }
    });

    var sql = "DELETE FROM test_accounts";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table Cleared");
    });

    var sql = "INSERT INTO test_accounts (id, name, office, broker, clientAdvocate, industry, revenue, footprint, limits, losses, retentions) VALUES (1, 'Bergen County Academies', 'Wayne Plaza II', 'Roberts', 'Bobs', 'Education', 12, 1, 50000, 2500, 1)";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});
