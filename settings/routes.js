module.exports = function(app, passport, oauth2) {

	var utils  = require("../utils");
	var render = utils.render;

	// Home page
	app.get('/', utils.login.ensureLoggedIn(), render.home);

	// Profile page
	app.get('/profile',	utils.login.ensureLoggedIn(), render.profile);

	// Files page
	app.get('/files/:owner?/:route*?', utils.login.ensureLoggedIn(), render.files);

	// Files page
	app.get('/json/files/:owner?/:route*?', utils.login.ensureLoggedIn(), render.files);

	// Create new folder
	app.post('/json/files/create', utils.login.ensureLoggedIn(), render.createFile);

	// Delete file
	app.delete('/json/files/:id', utils.login.ensureLoggedIn(), render.deleteFile);


	// ****************************************** //
	// ************* AUTHENTICATION ************* //
	// ****************************************** //

	// Login page
	app.get('/login', render.login);

	// Process the authentication
	app.post('/login', passport.authenticate('dessert', {
		successReturnToOrRedirect : '/',
		failureRedirect : '/login'
	}));

	// Logout
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/isLogged', function(req, res){
		res.json({isLogged: req.user?true:false})
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
		successRedirect : '/',
		failureRedirect : '/register'
	}));

};