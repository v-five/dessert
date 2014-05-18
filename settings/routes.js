module.exports = function(app, passport) {

	var utils  = require("../utils");
	var render = utils.render;

	// Home page
	app.get('/', render.home);

	// Profile page
	app.get('/profile',	utils.isLoggedIn, render.profile);


	// ****************************************** //
	// ************* AUTHENTICATION ************* //
	// ****************************************** //

	// Login page
	app.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});

	// Process the authentication
	app.post('/login',  passport.authenticate('dessert', {
		successReturnToOrRedirect : '/profile',
		failureRedirect : '/login'
	}));

	// Logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});




	// ****************************************** //
	// ************** REGISTRATION ************** //
	// ****************************************** //

	// Register page
	app.get('/register', function(req, res) {
		res.render('register', { message: req.flash('registerMessage') });
	});

	// Process the registration
	app.post('/register', passport.authenticate('dessert-register', {
		successRedirect : '/profile',
		failureRedirect : '/register'
	}));

};