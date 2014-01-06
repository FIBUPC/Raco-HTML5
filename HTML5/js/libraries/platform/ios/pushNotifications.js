//
//  PushNotification.js
//
// Created by Olivier Louvignes on  2012-05-06.
// Inspired by Urban Airship Inc orphaned PushNotification phonegap plugin.
//
// Copyright 2012 Olivier Louvignes. All rights reserved.
// MIT Licensed

(function(cordova) {
	function PushNotification() {
		// Declaration
	}

	PushNotification.prototype.openChannel = function() {
		var deferred = $.Deferred();

		var that = this;
		setTimeout(function(){
			try {
				that.register(function(deviceToken){
					console.log("register ok callback");
					deferred.resolve(deviceToken);
				},
				function(error){
					console.log("register error callback");
					deferred.reject(error);
				}, {
					alert: true,
					badge: true,
					sound: true
				});
			}
			catch (e) {
				deferred.reject(e);
			}
		}, 0);

		return deferred.promise();
	};

	PushNotification.prototype.closeChannel = function(channelId, channelObject) {
		var deferred = $.Deferred();

		var that = this;
		// APNS does not need to close the channel
		setTimeout(function(){
			that.unregister(function(){
				console.log("Unregistration succeeded");
				deferred.resolve();
			}, function(){
				console.log("Unregistration failed");
				deferred.reject();
			});
		}, 0);
		
		return deferred.promise();
	};

	// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
	PushNotification.prototype.register = function(successCallback, errorCallback, options) {
	    if (errorCallback == null) { errorCallback = function() {}}

	    if (typeof errorCallback != "function")  {
	        console.log("PushNotification.register failure: failure parameter not a function");
	        return
	    }

	    if (typeof successCallback != "function") {
	        console.log("PushNotification.register failure: success callback parameter must be a function");
	        return
	    }

		cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
	};

	// Call this to unregister for push notifications
	PushNotification.prototype.unregister = function(successCallback, errorCallback) {
	    if (errorCallback == null) { errorCallback = function() {}}

	    if (typeof errorCallback != "function")  {
	        console.log("PushNotification.unregister failure: failure parameter not a function");
	        return
	    }

	    if (typeof successCallback != "function") {
	        console.log("PushNotification.unregister failure: success callback parameter must be a function");
	        return
	    }

	     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
	};
	 
	 
	// Call this to set the application icon badge
	PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
	    if (errorCallback == null) { errorCallback = function() {}}

	    if (typeof errorCallback != "function")  {
	        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
	        return
	    }

	    if (typeof successCallback != "function") {
	        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
	        return
	    }

	    cordova.exec(successCallback, errorCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
	};

	cordova.addConstructor(function() {
		if (!window.plugins) {
			window.plugins = {};
		}
		window.plugins.pushNotifications = new PushNotification();
	});

})(window.cordova || window.Cordova);