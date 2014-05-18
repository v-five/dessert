
exports.home = function (req, res){
	res.render("home");
};

exports.profile = function (req, res){

	var user     = req.user;
	var API      = require('../utils').API;

	API.profile(user.accessToken, function(err, profile, info){

		if(err)
			res.render("error", {error: err});

		if(!profile)
			res.render("error", {error: info});

		else
			res.render("profile", {user: profile});

	});
};