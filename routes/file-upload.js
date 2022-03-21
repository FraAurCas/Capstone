var express = require('express');
var router = express.Router();
var con = require('./database');
var XLSX = require("xlsx");

router.get('/', function(req, res, next) {
  res.render('file-upload', { title: 'File Upload' });
});
    
router.post('/', function(req, res, next) {

      const entry_file = document.getElementById('entry_file').value || "";
      
      var workbook = XLSX.readFile(entry_file);
      var sheet_name_list = workbook.SheetNames;
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      console.log(xlData);
    
  res.render('file-upload', { title: 'File Upload' });
});

module.exports = router;