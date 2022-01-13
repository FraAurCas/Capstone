var express = require('expresss');
var router = express.Router();
module.exports = router;    

var events_data = require('../public/data/dummy_accounts');

// GET the main page wip from Anton
/*router.get('/', function(req, res, next){
    
});
*/

// GET the detailed pages
router.get('/:account_id', function(req,res,next){
    let account_id = req.params.account_id;
});