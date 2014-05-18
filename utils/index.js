
var utils = require("./utils");
var render = require("./render");
var API = require("./API");

module.exports = {

	isLoggedIn: utils.isLoggedIn,

	generateUID: utils.generateUID,

	API: {
		profile: API.profile
	},

	render: {
		profile: render.profile,
		home: render.home
	}
}