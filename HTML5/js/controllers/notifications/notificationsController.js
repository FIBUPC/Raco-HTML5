define(
	['utils/httpClient'],
	function(HttpClient) {
	    'use strict';

	    var self,
	    NotificationsController = {
	        notificationsActive: false,
            channelUri: null,
	        channelObject: null
	    };

	    NotificationsController.initialize = function() {
	        self = this;
	    };

	    NotificationsController.enablePushNotifications = function(id) {
	        if (window.plugins.pushNotifications) {
	            window.plugins.pushNotifications.openChannel().done(function (channelUri, channelObject) {
	                self.channelUri = channelUri;
	                self.channelObject = channelObject;
	                self.notificationsActive = true;
	                console.log("Push notification channel has been opened with channel identifier " + self.channelUri);
	            }).fail(function() {
                    console.log("Push notifications channel could not be opened.")
	            });
	        }
	        else {
	            console.log("Push notifications are not supported on this platform.");
	        }
	    };

	    NotificationsController.disablePushNotifications = function(id) {
	        if (window.plugins.pushNotifications) {
	            window.plugins.pushNotifications.closeChannel(self.channelId, self.channelObject).done(function () {
	                self.channelObject = null;
	                self.channelId = null;
	                self.notificationsActive = false;
	                console.log("Push notification channel has been closed.");
	            }).fail(function () {
	                self.channelObject = null;
	                self.channelId = null;
	                self.notificationsActive = false;
	                console.log("Push notifications channel could not be closed.")
	            });
	        }
	        else {
	            console.log("Push notifications are not supported on this platform.");
	        }
	    };

	    NotificationsController.saveChannelOnServerAsync = function (channelUri) {
            // Send channel to server to be saved
	    };

	    NotificationsController.deleteChannelFromServerAsync = function (channelUri) {
	        // Send channel to server to be deleted
	    };

	    return NotificationsController;
	}
);