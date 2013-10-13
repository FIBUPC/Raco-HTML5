define(
	['controllers/login/oAuthController'],
	function(OAuthController) {
	    'use strict';
	    
	    var HttpClient = { };

	    HttpClient.initialize = function() {
	    	
	    };

	    HttpClient.postSignedAsync = function(url, parameters) {
	    	var deferred = $.Deferred();

	    	if (!OAuthController.isAuthenticated()) {
	    		throw 'User must be authenticated in order to send an async request.';
	    	}

	    	try
	    	{
	    		console.log("URL: " + url);
		    	OAuthController.oAuthService.get(url, function(data) {
		    		console.log(data);
		            deferred.resolve(data.text);
		        }, function(error){
		        	deferred.reject(error);
		        });
	    	}
	    	catch (e) {
	    		deferred.reject(e);
	    	}

	    	return deferred.promise();
	    };

	    HttpClient.postAsync = function(url, parameters) {

	    };

	    HttpClient.getAsync = function(url, parameters) {

	    };

	    HttpClient.putSignedAsync = function(url, parameters) {

	    };
	    
	    return HttpClient; 
	}
);