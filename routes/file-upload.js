var express = require('express');
var router = express.Router();
var con = require('./database');
var XLSX = require("xlsx");
var formidable = require('formidable');

router.get('/', function(req, res, next) {
  res.render('file-upload', { title: 'File Upload' });
});
    
router.post('/', function(req, res, next) {

  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error', err)
      throw err
    }
    console.log('Fields', fields)
    //console.log('Files', files)
    for (const file of Object.entries(files)) {
      var workbook = XLSX.readFile(file[1].filepath);
      var sheet_name_list = workbook.SheetNames;
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
      console.log(xlData);
    }
  })
    
  res.render('file-upload', { title: 'File Upload' });
});

module.exports = router;