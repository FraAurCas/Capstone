var express = require('express');
var router = express.Router();
module.exports = router;    

var accounts_data = require('../data/dummy_accounts');

// GET the main page wip from Anton
/*router.get('/', function(req, res, next){
    
});
*/

// GET the detailed pages
router.get('/:account_id', function(req,res,next){
    let account_id = req.params.account_id;
    let account = accounts_data.find(function (evt) {return evt.account_id == account_id});

    if (account === undefined) {
        next();
    }
    else{
        res.render('account_detail', { title: account.account_name, styles: ["tables", "account"], account: account});
    }
});