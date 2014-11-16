
exports.profile = function(accessToken, done){

	var endpoint = "/api/profile?access_token="+accessToken;
	var method = "GET";

	performRequest(endpoint, method, function(err, profile, info){

		if(err)
			return done(err);

		if(!profile)
			return done(null, false, info);

		done(null, profile);
	});
};

exports.files = function(accessToken, owner, route, done){

	var method = "GET";
	var endpoint = "/api/files";

	if(owner !== undefined)
		endpoint += "/" + owner;

	if(route !== undefined)
		endpoint += "/" + route;

	endpoint += "?access_token="+accessToken;


	performRequest(endpoint, method, function(err, document, info){

		if(err)
			return done(err);

		if(!document)
			return done(null, false, info);

		done(null, document);
	});
};

exports.createFile = function(accessToken, file, done){

	var utils       = require('../utils');
	var method      = "POST";
	var endpoint    = "/api/files/create";

	endpoint += "?access_token="+accessToken;

	performRequest(endpoint, method, utils.query.stringify(file), function(err, profile, info){

		if(err)
			return done(err);

		if(!profile)
			return done(null, false, info);

		done(null, profile);
	});
};

var performRequest = function (endpoint, method, data, done){

	done = done || data;
	if(typeof data == 'function')
		data = '';

	var env = process.env.NODE_ENV || 'development';
	var http = require('http');
	var options = {
		path: endpoint,
		method: method
	};

	if ('development' == env){
		options.hostname = 'localhost';
		options.port = 3000;
	}else if ('koding' == env){
        options.hostname = 'localhost';
        options.port = 3000;
    }else{
		options.hostname = 'dessert-api.herokuapp.com';
	}

	if(data != ''){

		options.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		}
	}

	var req = http.request(options, function(response) {

		var body = '';
		response.on('data', function(chunk) {
			body += chunk;
		});

		if(response.statusCode == "200"){
			response.on('end', function() {
				try{
					var json = JSON.parse(body);
					done(null, json);
				}catch(e){
					done(e);
				}
			});
		}else{
			var info = new Object();

			info.code = response.statusCode;
			info.name = "HttpError";

			if(response.headers['www-authenticate']){
				var error_match = response.headers['www-authenticate'].match(/error[=]["]+(.*)",/);
				var error_description_match = response.headers['www-authenticate'].match(/error_description[=]["]+(.*)"/);
			}

			if(error_match)
				info.error = error_match[1];
			if(error_description_match)
				info.message = error_description_match[1];

			done(null, false, info);
		}
	});

	req.on('error', function(e) {
		done(false, e);
	});


	if(data != ''){
		req.write(data);
	}
	req.end();
}