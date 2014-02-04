/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['./oAuthController',
	 'models/user',
	 'utils/httpClient',
	 'utils/dispatcher'],
	function (OAuthController, User, HttpClient, Dispatcher) {
	    'use strict';
	    
	    var self,
	    LoginController = {
	    	currentUser: new User()
	    };

	    LoginController.initialize = function () {
	    	self = this;

	    	OAuthController.initialize();
	    	self.fetchCurrentUserAsync();
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
		    		self.currentUser.set(JSON.parse(currentUser));
		    	}
		    });
	    };

	    LoginController.saveCurrentUserAsync = function(currentUser) {
	    	Dispatcher.beginInvoke(function(){
		    	localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser));
		    	localStorage.setItem('CURRENT_USER_LATEST_SYNC', new Date());
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

	    		self.currentUser.set(currentUser);
	    		self.saveCurrentUserAsync(currentUser);

	    		Helpers.Environment.log("User information synced.");
	    	}).fail(function(error){
	    		Helpers.Environment.log("Error retrieving user information.");
	    	});
	    };
	    
	    return LoginController; 
	}
);