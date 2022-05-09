var express = require('express');
var expressHbs = require('express-handlebars');
var con = require('./database');
const { handlebars } = require('hbs');

var router = express.Router();

var hbs = expressHbs.create({
    helpers: require('../helpers/handlebars').helpers,
    defaultLayout: 'layout',
    extname: '.hbs'
});

// const hbsHelpers = require('../helpers/handlebars');

console.log('===============')
console.log(hbs.handlebars.helpers);


//var accounts_data = require('../data/dummy_accounts');

// GET some main accounts page, might not be needed
/*router.get('/', function(req, res, next){

});
*/

// GET the detailed pages
/*router.get('/:account_id', function(req,res,next){
    let account_id = req.params.account_id;
    let account = accounts_data.find(function (evt) {return evt.account_id == account_id});

    if (account === undefined) {
        next();
    }
    else{
        res.render('account_detail', { title: account.account_name, styles: ["tables", "account"], account: account});
    }
});*/


//GET the detailed pages from the database
router.get('/:account_id', function (req, res, next) {
    let account_id = req.params.account_id;
    var individualQueryString = "SELECT * FROM stringData WHERE ID = " + account_id + " LIMIT 1;";
    console.log(account_id);
    //    var individualQueryString = "SELECT "+ account_id+" FROM test_accounts"; 
    //    var individualQueryString = "SELECT * WHERE id BETWEEN "+ account_id+" AND "+ 1 + " FROM test_accounts"; 
    //SELECT * WHERE id = account_id
    console.log(individualQueryString);
    con.query(individualQueryString, function (err, result, fields) {
        if (err) throw err;
        let account = result;
        console.log("--------------");
        console.log(account);
        console.log("--------------");
        // console.log(account[0].name);
        // var tabName = account[0].name;
        // console.log("--------------");
        // console.log(tabName);
        // console.log(result[0]);
        // console.log("--------------");
        // console.log(result[0].name);
        // console.log("--------------");
        // console.log(result[0].Name);
        // console.log("--------------");

        if (account[0] === undefined) {
            next();
        }
        else {
            res.render('account_detail', { title: account[0].name, array: account, styles: ["tables", "account"] });
        }

    });

});

router.post('/:account_id', function (req, res, next) {
    var entry_ID = req.body.entry_ID || "";
    var entry_segment = req.body.entry_segment || "";
    var entry_region = req.body.entry_region || "";
    var entry_industry = req.body.entry_industry || "";
    var entry_hazard = req.body.entry_hazard || "";
    var entry_revenue = req.body.entry_revenue || "";
    var entry_units = req.body.entry_units || "";
    var entry_TIV = req.body.entry_TIV || "";
    var entry_payroll = req.body.entry_payroll || "";
    var entry_exposure = req.body.entry_exposure || "";
    var entry_description = req.body.entry_description || "";

    console.log("---------------------------------------------------------")
    console.log(req.body);

    con.query(
        `UPDATE stringData 
        SET segment = ?, region = ?, industry = ?, hazardGroup = ?, revenue = ?, powerUnits = ?, insurableValue = ?, payroll = ?, catastrophe = ?, description = ?
        WHERE ID = ?;`,
        [entry_segment,
            entry_region,
            entry_industry,
            entry_hazard,
            entry_revenue,
            entry_units,
            entry_TIV,
            entry_payroll,
            entry_exposure,
            entry_description,
            entry_ID
        ],
        function (err, result) {
            if (err) throw err;
            console.log("1 record updated");

            res.redirect(301, '/accounts/' + entry_ID);
        });
    

    });

module.exports = router;