﻿/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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
	                Helpers.Environment.log("Push notification channel has been opened with channel identifier " + self.channelUri);
	            }).fail(function() {
                    Helpers.Environment.log("Push notifications channel could not be opened.")
	            });
	        }
	        else {
	            Helpers.Environment.log("Push notifications are not supported on this platform.");
	        }
	    };

	    NotificationsController.disablePushNotifications = function(id) {
	        if (window.plugins.pushNotifications) {
	            window.plugins.pushNotifications.closeChannel(self.channelId, self.channelObject).done(function () {
	                self.channelObject = null;
	                self.channelId = null;
	                self.notificationsActive = false;
	                Helpers.Environment.log("Push notification channel has been closed.");
	            }).fail(function () {
	                self.channelObject = null;
	                self.channelId = null;
	                self.notificationsActive = false;
	                Helpers.Environment.log("Push notifications channel could not be closed.")
	            });
	        }
	        else {
	            Helpers.Environment.log("Push notifications are not supported on this platform.");
	        }
	    };

	    NotificationsController.saveChannelOnServerAsync = function (channelUri) {
            // TODO: Send channel to server to be saved
            //     channelUri contains the string to be sent to the server
            //     the platform name could be retrieved from MobileOS object
            // Hint: Use HttpClient.getSiynedAsync
	    };

	    NotificationsController.deleteChannelFromServerAsync = function (channelUri) {
	        // Send channel to server to be deleted
	        //     channelUri contains the string to be sent to the server
            //     the platform name could be retrieved from MobileOS object
            // Hint: Use HttpClient.getSiynedAsync
	    };

	    return NotificationsController;
	}
);