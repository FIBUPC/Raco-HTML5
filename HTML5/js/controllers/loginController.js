define ([/*'../models/user'*/], function () {
    'use strict';
    
    var LoginController = {
    	loggedIn: false
    };

    LoginController.isLoggedIn = function () {       
    	return this.loggedIn;
    };
    
    return LoginController; 
});