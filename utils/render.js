
exports.home = function (req, res){
	res.render("template", {page: 'home.html'});
};

exports.profile = function (req, res){

	var API      = require('../utils').API;
	var user     = req.user;

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

exports.files = function (req, res){

	var API      = require('../utils').API;
	var user     = req.user;
	var owner    = req.params.owner;
	var route    = req.params.route || "";
	route += req.params[0] || "";

	API.files(user.accessToken, owner, route, function(err, document, info){

		if(err)
			res.render('template', { page: 'error.html', error: err });

		if(!document)
			res.render('template', { page: 'error.html', error: info });

		else
			res.render('template', { page: 'files.html', document: document });
	});
}

exports.createFile = function (req, res){

	var API      = require('../utils').API;
	var user     = req.user;
	var file = new Object();

	file.owner = req.body.owner;
	file.name = req.body.name;
	file.parent = req.body.parent;
	file.type = 'dir';
	file.content = [];

	API.createFile(user.accessToken, file, function(err, document, info){

		if(err)
			res.redirect(req.headers.referer);
//			res.render('template', { page: 'error.html', error: err });

		if(!document)
			res.redirect(req.headers.referer);
//			res.render('template', { page: 'error.html', error: info });

		else
			res.redirect(req.headers.referer);
	});
}