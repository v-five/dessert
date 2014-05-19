module.exports = function(app, passport, oauth2) {

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
	app.get('/login', render.login);

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
	// *************** OAUTH 2.0  *************** //
	// ****************************************** //

	app.get ('/oauth2',          oauth2.authorization);
	app.post('/oauth2/decision', oauth2.decision);
	app.post('/oauth2/token',    oauth2.token);



	// ****************************************** //
	// ************** REGISTRATION ************** //
	// ****************************************** //

	// Register page
	app.get('/register', render.register);

	// Process the registration
	app.post('/register', passport.authenticate('dessert-register', {
		successRedirect : '/profile',
		failureRedirect : '/register'
	}));

};