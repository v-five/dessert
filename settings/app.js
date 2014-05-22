
module.exports = function(app) {

	var swig         = require('swig');
	var mongoose     = require('mongoose');
	var bodyParser   = require('body-parser');
	var cookieParser = require('cookie-parser');
	var directory    = require('serve-index');
	var serveStatic  = require('serve-static');
	var session      = require('express-session');
	var passport     = require('passport');
	var flash        = require('connect-flash');
	var config       = require("../config");
	var set          = require('../settings').set;
	var get          = require('../settings').get;
	var oauth2orize  = require('oauth2orize');
	var server       = oauth2orize.createServer();

	set.mongoose(mongoose);
	set.passport(passport);
	set.OAuth2orize(oauth2orize, server);
	set.OAuth2(server, passport)

	app.engine('html', swig.renderFile);
	app.set('view engine', 'html');

//	app.use(directory('public', {'icons': true}));
	app.use(serveStatic('public'));

	app.use(bodyParser());
	app.use(cookieParser());

	app.use(session({ secret: config.session.secret() }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	swig.setDefaults({cache: false});

	set.routes(app, passport, get.OAuth2());
};