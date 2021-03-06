
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
			return done(null, false, req.flash('info', 'No user found.'));

		if(!user.validPassword(formData.password))
			return done(null, false, req.flash('info', 'Oops! Wrong password.'));

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

		if(token && token !== null && !token.expired())
			return done(null, token.token);

		if(token && token.expired())
			Token.findById(token._id).remove();

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

	User.findOne({ $or:[ { 'email' :  formData.email }, { 'username' :  formData.username } ]}, function(err, user) {

		if (err)
			return done(err);

		if (user)
			if(user.username == formData.username)
				return done(null, false, req.flash('info', 'That username is already taken.'));
			else
				return done(null, false, req.flash('info', 'That email is already taken.'));

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

exports.generateExchangeCode = function(user, client, done){
	var exchangeCode     = utils.generateUID();
	var dateNow          = Date.now();
	var newToken         = new Token();

	newToken.token       = exchangeCode;
	newToken.type        = 'exchange';
	newToken.user        = user._id;
	newToken.client      = client.id;
	newToken.scope       = client.scope;
	newToken.created     = dateNow;
	newToken.expire      = dateNow + 10*60*1000;

	newToken.save(function (err) {
		if (err)
			return done(err);
		return done(null, exchangeCode);
	});
};

exports.generateAccessToken = function(client, exchangeCode, done){

	Token.findOne({type: 'exchange', token: exchangeCode}, function(err, exchangeToken) {

		if (err)
			return done(err);

		if (!exchangeToken)
			return done(null, false);

		if (exchangeToken.expired())
			return done(null, false);

		if (client.id !== exchangeToken.client)
			return done(null, false);

//		if (redirectURI !== exchangeCode.redirectURI)
//          return done(null, false);

		exchangeToken.remove(function (err) {
			if(err)
				return done(err);

			var accessToken  = utils.generateUID(256);
			var dateNow      = Date.now();
			var newToken     = new Token();

			newToken.token   = accessToken;
			newToken.type    = 'access';
			newToken.user    = exchangeToken.user;
			newToken.client  = exchangeToken.client;
			newToken.scope   = exchangeToken.scope;
			newToken.created = dateNow;
			newToken.expire  = dateNow + 24*60*60*1000;

			newToken.save(function (err) {
				if (err)
					return done(err);
				return done(null, accessToken, "refreshToken", {'expires_in': "24 hours"});
			});
		});
	});
}

















