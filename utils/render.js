
exports.home = function (req, res){
	res.render("template", {page: 'home.html'});
};

exports.profile = function (req, res){

	var user     = req.user;
	var API      = require('../utils').API;

	API.profile(user.accessToken, function(err, profile, info){

		if(err)
			res.render('template', { page: 'error.html', error: err });

		if(!profile)
			res.render('template', { page: 'error.html', error: info });

		else
			res.render("template", { page: 'profile.html', user: profile});

	});
};

exports.login = function (req, res){
	res.render('template', { page: 'login.html', message: req.flash('loginMessage') });
};

exports.register = function (req, res){
	res.render('template', { page: 'register.html', message: req.flash('registerMessage') });
}