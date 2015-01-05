
var utils = require("./utils");
var render = require("./render");
var API = require("./API");

module.exports = {

	login       :   utils.login,

	generateUID :   utils.generateUID,

	query       :   utils.query,

	API: {
		profile :   API.profile,
		files   :   API.files,
		createFile: API.createFile,
		updateFile: API.updateFile,
		deleteFile: API.deleteFile
	},

	render: {
		profile :   render.profile,
		home    :   render.home,
		login   :   render.login,
		register:   render.register,
		files   :   render.files,
		createFile: render.createFile,
		updateFile: render.updateFile,
		deleteFile: render.deleteFile
	}
}