/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['jsOAuth'],
	function (JsOAuth) {	    
	    var oAuthController = {
	    	config: {
		        consumerKey: "d84ae868-ae73-49e9-98d6-d4e4e3504a16",
		        consumerSecret: "dd73c2b6-f398-47fd-9f94-83a72fb89ddf",

		        requestTokenUrl: "https://raco.fib.upc.edu/oauth/request_token",
		        authorizationUrl: "https://raco.fib.upc.edu/oauth/protected/authorize",
		        accessTokenUrl: "https://raco.fib.upc.edu/oauth/access_token",

		        testAccessToken: {
		        	key: "b8d2bc68690a807eda9a8ca5bda64d88",
		        	secret: "24a0ffbce136a5be75e3e61496b318b5"
		        }
	    	},
	    	oAuthService: null,
	    	accessToken: {
	    		key: null,
	    		secret: null
	    	},
	    	iFrameLoginId: 'iframe-login'
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

	    oAuthController.connect = function(successCallback, errorCallback) {
			var that = this;

	    	if (this.isAuthenticated()) {
	    		if (errorCallback) {
	    			errorCallback("User is already authenticated.");
	    		}
	    		else {
	    			throw new Exception("User is already authenticated");
	    		}

	    		return;
	    	}

	    	if (DEBUG) {
	    		// use test access token
	    		this.oAuthService.setAccessToken(this.config.testAccessToken.key,
	    			this.config.testAccessToken.secret);

	    		saveAccessToken();
	    	}
	    	else {
	    		this.oAuthService.fetchRequestToken(openAuthorizationWindow, failureHandler);
	    	}
	    	
		    function openAuthorizationWindow(url) {
		    	if (!MobileDetector.isNativeApp()) {
		    		var iframe = document.createElement('iframe');
			    	iframe.id = that.iFrameLoginId;
			    	iframe.src = url;
			    	iframe.frameborder = 0;

			    	document.getElementsByTagName('body')[0].appendChild(iframe);
			    	var $iFrame = $('#' + that.iFrameLoginId);
			    	
			        setTimeout(waitForAuthorization, 100);
			        function waitForAuthorization() {
		    			if ($iFrame.contents().text().indexOf('successfully') > 0) {
			    			that.oAuthService.fetchAccessToken(saveAccessToken, failureHandler);
			    		}
			    		else {
			    			setTimeout(waitForAuthorization, 100);
			    		}
			        }
		    	}
		    	else {
		    	    if (MobileDetector.isWindows()) {
		    	        // Windows 8 does not have support for Apache Cordova yet.
		    	        // We have to use Windows.Security WebAuthenticationBroker to
		    	        // let the user authorize this application.
		    	        var endURIString = 'http://www.fib.upc.edu/';
		    	        var endURI = new Windows.Foundation.Uri(endURIString);
		    	        var startURI = new Windows.Foundation.Uri(url + '&oauth_callback=' + encodeURI(endURIString));

		    	        Windows.Security.Authentication.Web.WebAuthenticationBroker.authenticateAsync(
                            Windows.Security.Authentication.Web.WebAuthenticationOptions.none, startURI, endURI)
                            .done(function (result) {
                                if (result.responseStatus === Windows.Security.Authentication.Web.WebAuthenticationStatus.errorHttp) {
                                    failureHandler();
                                }
                                else {
                                    that.oAuthService.fetchAccessToken(saveAccessToken, failureHandler);
                                }
                            }, function (error) {
                                failureHandler(error);
;                           });
		    	    }
		    	    else {
		    	        function checkLocation(resp) {
		    	            if (resp.location.endsWith('authorize')) {
		    	                window.plugins.childBrowser.close();
		    	                that.oAuthService.fetchAccessToken(saveAccessToken, failureHandler);
		    	            }
		    	            else if (resp.location.endsWith('no-authorize')) {
		    	                window.plugins.childBrowser.close();
		    	                failureHandler();
		    	            }
		    	        }

		    	        // Android and Windows Phone ChildBrowser plugin compatibility
		    	        if (!window.plugins.childBrowser.onLocationChange) {
		    	            window.plugins.childBrowser.onLocationChange = checkLocation;
		    	        }

		    	        window.plugins.childBrowser.showWebPage(url, checkLocation, function () {
		    	            failureHandler();
		    	        });
		    	    }
		    	}
		    }

		    function saveAccessToken() {
		    	hideLoginFrame();

		    	localStorage.setItem("OAUTH_ACCESS_TOKEN_KEY", that.oAuthService.getAccessTokenKey());
		    	localStorage.setItem("OAUTH_ACCESS_TOKEN_SECRET", that.oAuthService.getAccessTokenSecret());

		    	that.accessToken.key = that.oAuthService.getAccessTokenKey();
	    		that.accessToken.secret = that.oAuthService.getAccessTokenSecret();

		    	if (successCallback) {
		    		successCallback();
		    	}
		    }

		    function failureHandler(error) {
		    	hideLoginFrame();

		        if (errorCallback) {
		        	errorCallback(error);
		        }
		        else {
		        	throw new Exception(error);
		        }
		    }

		    function hideLoginFrame() {
		    	$('#' + that.iFrameLoginId).remove();
		    }
	    };

	    oAuthController.logout = function(callback) {
	    	localStorage.removeItem("OAUTH_ACCESS_TOKEN_KEY");
	    	localStorage.removeItem("OAUTH_ACCESS_TOKEN_SECRET");

	    	this.accessToken.key = null;
	    	this.accessToken.secret = null;

	    	callback();
	    }
	    
	    return oAuthController; 
	}
);