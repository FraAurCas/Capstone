var express = require('express');
var expressHbs = require('express-handlebars');
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
var con =  require('./database');

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
router.get('/:account_id', function(req,res,next){
    let account_id =req.params.account_id;
    var individualQueryString = "SELECT * FROM devData WHERE ID = " + account_id +" LIMIT 1;";
    console.log(account_id);
//    var individualQueryString = "SELECT "+ account_id+" FROM test_accounts"; 
//    var individualQueryString = "SELECT * WHERE id BETWEEN "+ account_id+" AND "+ 1 + " FROM test_accounts"; 
//SELECT * WHERE id = account_id
    console.log(individualQueryString);
    con.query(individualQueryString, function (err, result, fields){
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
        else{
            res.render('account_detail', { title: account[0].name, array: account, styles: ["tables", "account"]});
        }
    
    });
    
});

module.exports = router;