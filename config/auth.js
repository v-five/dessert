
module.exports = {

	'localhost' : {
		'authorizationURL'  : 'http://localhost:3000/oauth2',
		'tokenURL'          : 'http://localhost:3000/oauth2/token',
		'clientID' 		    : 'abc123',
		'clientSecret'   	: 'ssh-secret',
		'callbackURL' 	    : 'http://localhost:3030/auth/dessert/callback'
	},

    'dessert' : {
        'authorizationURL'  : 'http://dessert-api.herokuapp.com/oauth2',
        'tokenURL'          : 'http://dessert-api.herokuapp.com/oauth2/token',
        'clientID' 		    : 'abc123',
        'clientSecret'   	: 'ssh-secret',
        'callbackURL' 	    : 'http://dessert-web.herokuapp.com/auth/dessert/callback'
    },

    'koding' : {
        'authorizationURL'  : 'http://v-five.ml:3000/oauth2',
        'tokenURL'          : 'http://v-five.ml:3000/oauth2/token',
        'clientID' 		    : 'abc123',
        'clientSecret'   	: 'ssh-secret',
        'callbackURL' 	    : 'http://v-five.ml/auth/dessert/callback'
    },

	'facebook' : {
		'clientID' 		    : '689529984440238',
		'clientSecret'   	: '07d3b4501478bd913409789f86a515c7',
		'callbackURL'   	: 'http://localhost:3030/auth/facebook/callback'
	}

};