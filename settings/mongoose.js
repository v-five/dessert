module.exports = function(mongoose){

	var db  = require('../config').database;
	//var env = process.env.NODE_ENV || 'development';
	return mongoose.connect(db.url.mongolab);
	//if ('development' == env) {
	//	return mongoose.connect(db.url.localhost);
	//}else{
	//	return mongoose.connect(db.url.mongolab);
	//}

};