define(
	['./oAuthController'],
	function (oAuthController) {
	    'use strict';
	    
	    var LoginController = { };

	    LoginController.initialize = function () {
	    	oAuthController.initialize();
	    };
		
	    LoginController.isLoggedIn = function () {       
	    	return oAuthController.isAuthenticated();
	    };

	    LoginController.login = function (successCallback, errorCallback) {
	    	oAuthController.connect(successCallback, errorCallback);
	    };
	    
	    return LoginController; 
	}
);