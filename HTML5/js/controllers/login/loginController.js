define(
	['./oAuthController',
	 'models/user',
	 'utils/httpClient'],
	function (OAuthController, User, HttpClient) {
	    'use strict';
	    
	    var self,
	    LoginController = {
	    	currentUser: new User()
	    };

	    LoginController.initialize = function () {
	    	self = this;

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
	    };

	    LoginController.fetchCurrentUserAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var currentUser = localStorage.getItem('CURRENT_USER');
		    	if (currentUser != null) {
		    		self.currentUserLatestSync = moment(localStorage.getItem('CURRENT_USER_LATEST_SYNC'));
		    		self.currentUser = new User(JSON.parse(currentUser));
		    	}
		    });
	    };

	    LoginController.getCurrentUserDataAsync = function(force) {
	    	if (self.latestSync != null && !force) {
	    		if (moment().diff(self.latestSync) < Constants.Application.AutoSyncDelay) {
	    			return;
	    		}
	    	}

	    	self.latestSync = moment();
	    	var currentUserDataRequest = HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.CurrentUser.Data);
	    	var currentUserImageRequest = HttpClient.readSignedStreamAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.CurrentUser.Image);
	    	
	    	$.when(currentUserDataRequest, currentUserImageRequest)
	    		.done(function(currentUserData, currentUserImage) {
	    		var currentUser = JSON.parse(currentUserData);
	    		currentUser.image = currentUserImage;
	    		console.log(currentUser);
	    		self.currentUser.set(currentUser);
	    		console.log("User information synced.");
	    	}).fail(function(error){
	    		console.log("Error retrieving user information.");
	    	});
	    };
	    
	    return LoginController; 
	}
);