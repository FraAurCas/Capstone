var express = require('express');
var router = express.Router();
module.exports = router;

var account_data = require('../data/dummy_accounts');

//Make the data palatable for the page
let mask = (({
    "account_id": a,
    "account_name": b,
    "account_office": c,
    "account_broker": d,
    "account_clientAdvocate": e,
    "account_industry": f,
    "account_revenue": g,
    "account_footprint": h,
    "account_limits": i,
    "account_losses": j,
    "account_retentions": k 
}) => ({
    "account_name": b,
    "account_office": c,
    "account_broker": d,
    "account_clientAdvocate": e,
    "account_industry": f,
    "account_revenue": g,
    "account_footprint": h,
    "account_limits": i,
    "account_losses": j,
    "account_retentions": k
}))

/* GET main page. */
router.get('/', function (req, res, next) {
    res.render('main', { title: 'Policies', array: mask(account_data) });
}); 