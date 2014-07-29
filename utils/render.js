
exports.home = function (req, res){
	var page = {
		angular: true,
		topMenu: true,
		template: 'workspace'
	}

	res.render('template', {page: page});
};

exports.profile = function (req, res){
	var page = {
		angular: true,
		topMenu: true,
		template: 'profile'
	}

	res.render('template', {page: page});
};

exports.profileA = function (req, res){

	var API      = require('../utils').API;
	var user     = req.user;

	API.profile(user.accessToken, function(err, profile, info){

		var page = {
			topMenu: true,
			error: err,
			info: info,
			profile: profile
		}

		if(err)
			page.template = 'error.html';

		if(!profile)
			page.template = 'info.html';

		else
			page.template = 'profile.html';

		res.render('template', { page: page});
	});
};

exports.login = function (req, res){

	res.render('template', {
		page: {
			template: "login.html"
		},
		message: req.flash('info')
	});
};

exports.register = function (req, res){

	res.render('template', {
		page: {
			template: "register.html"
		},
		message: req.flash('info')
	});
}

exports.files = function (req, res){

	var API      = require('../utils').API;
	var user     = req.user;
	var owner    = req.params.owner;
	var route    = req.params.route || "";
	route += req.params[0] || "";

	API.files(user.accessToken, owner, route, function(err, document, info){

		if(err)
			res.render('template', { page: 'error.html', error: err });

		if(!document && info)
			res.render('template', { page: 'error.html', error: info });

		else
			res.json(document);
	});
}

exports.createFile = function (req, res){

	var API      = require('../utils').API;
	var user     = req.user;
	var file = req.body;

	API.createFile(user.accessToken, file, function(err, document, info){

		if(err)
			res.render('template', { page: 'error.html', error: err });

		if(!document && info)
			res.render('template', { page: 'error.html', error: info });

		else
			res.json(true);
	});
}