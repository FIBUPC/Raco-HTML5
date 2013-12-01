define(
	['./oAuthController'],
	function (OAuthController) {
	    'use strict';
	    
	    var LoginController = { };

	    LoginController.initialize = function () {
	    	OAuthController.initialize();
	    };
		
	    LoginController.isLoggedIn = function () {       
	    	return OAuthController.isAuthenticated();
	    };

	    LoginController.login = function (successCallback, errorCallback) {
	    	OAuthController.connect(successCallback, errorCallback);
	    };

	    LoginController.logout = function(callback) {
	    	OAuthController.logout(callback);
	    }
	    
	    return LoginController; 
	}
);