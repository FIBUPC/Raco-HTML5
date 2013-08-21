define(
	['jsOAuth'],
	function (jsOAuth) {
	    'use strict';
	    
	    var oAuthController = {
	    	config: {
		        consumerKey: "d84ae868-ae73-49e9-98d6-d4e4e3504a16",
		        consumerSecret: "dd73c2b6-f398-47fd-9f94-83a72fb89ddf",

		        requestTokenUrl: "https://raco.fib.upc.edu/oauth/request_token",
		        authorizationUrl: "https://raco.fib.upc.edu/oauth/protected/authorize",
		        accessTokenUrl: "https://raco.fib.upc.edu/oauth/access_token"
	    	},
	    	oAuthService: null,
	    	accessToken: {
	    		key: null,
	    		secret: null
	    	}
	    };

	    oAuthController.initialize = function() {
	    	this.oAuthService = new OAuth(this.config);

	    	this.checkSavedAccessToken();
	    };

	    oAuthController.checkSavedAccessToken = function() {
	    	this.accessToken.key = localStorage.getItem("OAUTH_ACCESS_TOKEN_KEY");
	    	this.accessToken.secret = localStorage.getItem("OAUTH_ACCESS_TOKEN_SECRET");

	    	if (this.accessToken.key !== null && this.accessToken.secret !== null) {
	    		// We already have a logged user
	    		this.oAuthService.setAccessToken(this.accessToken.key, this.accessToken.secret);
	    	}
	    };

	    oAuthController.isAuthenticated = function() {
	    	return (this.accessToken.key !== null && this.accessToken.secret !== null);
	    }

	    oAuthController.connect = function() {
	    	if (this.isAuthenticated()) {
	    		console.error("User is already authenticated");
	    		return;
	    	}

			console.log("Requesting token...");
		    this.oAuthService.fetchRequestToken(openAuthoriseWindow, failureHandler);

		    var that = this;
		    function openAuthoriseWindow(url) {
		        var wnd = window.open(url, 'authorise');
		        setTimeout(waitForPin, 100);

		        function waitForPin() {
		            if (wnd.closed) {
						console.log("Application successfully authorized.");
						console.log("Getting an access token...");
		                that.oAuthService.fetchAccessToken(saveAccessToken, failureHandler);
						console.log("Access token request done.");
		            }
		            else {
		                setTimeout(waitForPin, 100);
		            }
		        }
		    }

		    function saveAccessToken() {
		    	console.log("Authentication successfull!");
		    	console.log("Access token: " + that.oAuthService.getAccessToken());
		    	localStorage.setItem("OAUTH_ACCESS_TOKEN_KEY", that.oAuthService.getAccessTokenKey());
		    	localStorage.setItem("OAUTH_ACCESS_TOKEN_SECRET", that.oAuthService.getAccessTokenSecret());
				/*oauth.get("https://raco.fib.upc.edu/api-v1/info-personal.json", function (data) {
					console.log("/api-v1/info-personal.json result:");
		            console.log(data.text);
		        }, failureHandler);*/	
		    }

		    function failureHandler(data) {
		    	console.error("Authentication error");
		        console.error(data);
		    }
	    };
	    
	    return oAuthController; 
	}
);