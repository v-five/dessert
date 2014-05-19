
var express     = require('express');
var set         = require('./settings').set;
var port        = process.env.PORT || 3030;

//app init
var app = express();

//app set
set.app(app);

//app listen
app.listen(port, function(){
	console.log('Dessert Web started on port ' + port);
});