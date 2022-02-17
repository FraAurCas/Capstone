var hbs = require('express-handlebars');

function hbsHelpers(hbs) {
  return hbs.create({
    helpers: { 
      compareNum: function(inputNumber, checkAgainst){
        console.log('reading it');
	console.log (inputNumber == checkAgainst);
        return (inputNumber == checkAgainst);
      }

      // More helpers...
    }

  });
}

module.exports = hbsHelpers;