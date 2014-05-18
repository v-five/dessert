
var User     = require('../model').user;
var Token    = require('../model').token;
var utils    = require('../utils');

exports.findById = function(id, done){

	User.findById(id, function(err, user) {

		if(err)
			return done(err);

		if(!user)
			return done(null, false);

		getAccessToken(user._id, function(err, accessToken){

			if(err)
				return done(err);

			if(!accessToken)
				return done(null, false);

			done(null, {'_id': id, 'accessToken': accessToken});
		});
	});
};

exports.login = function(req, done){

	var formData = req.body;

	User.findOne({ 'username' : formData.username}, function(err, user) {

		if(err)
			return done(err);

		if(!user)
			return done(null, false, req.flash('loginMessage', 'No user found.'));

		if(!user.validPassword(formData.password))
			return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

		getAccessToken(user._id, function(err, accessToken){
			if(err)
				return done(err);

			if(!accessToken)
				return done(null, false);

			done(null, {'_id': user._id, 'accessToken': accessToken});
		});
	});
};

var getAccessToken = function(userID, done){

	Token.findOne({'client': 1, 'user': userID}, function(err, token){

		if(err)
			return done(err);

		if(token && token !== null)
			return done(null, token.token);

		var accessToken  = utils.generateUID(256);
		var dateNow      = Date.now();
		var newToken     = new Token();

		newToken.token   = accessToken;
		newToken.type    = 'access';
		newToken.user    = userID;
		newToken.client  = 1;
		newToken.scope   = ['all'];
		newToken.created = dateNow;
		newToken.expire  = dateNow + 24*60*60*1000;

		newToken.save(function (err) {
			if (err)
				return done(err);
			return done(null, accessToken);
		});
	});
}


exports.register = function(req, done){

	var formData = req.body;
	User.findOne({ 'email' :  formData.email }, function(err, user) {

		if (err)
			return done(err);

		if (user)
			return done(null, false, req.flash('registerMessage', 'That email is already taken.'));

		var newUser         = new User();

		newUser.email       = formData.email;
		newUser.username    = formData.username;
		newUser.password    = newUser.generateHash(formData.password);

		newUser.save(function(err) {
			if (err)
				throw err;
			return done(null, newUser);
		});

	});

}




















