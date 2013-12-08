define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/roomsList'],
	function(HttpClient, Dispatcher, RoomsList) {
	    'use strict';
	    
	    var self,
	    RoomsController = {
	    	rooms: new RoomsList(), //Observable collection
	    	latestSync: null
	    };

	    RoomsController.initialize = function() {
	    	self = this;
	    	
	    	self.fetchRoomsAsync();
	    };

	    RoomsController.fetchRoomsAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var rooms = localStorage.getItem('ROOMS');
		    	if (rooms != null) {
		    		self.latestSync = moment(localStorage.getItem('ROOMS_LATEST_SYNC'));
		    		self.rooms = new RoomsList(JSON.parse(rooms));
		    	}
		    });
	    };

	    RoomsController.getRoomsAsync = function(force) {
	    	if (self.latestSync != null && !force) {
	    		if (moment().diff(self.latestSync) < Constants.Application.AutoSyncDelay) {
	    			return;
	    		}
	    	}

	    	HttpClient.postSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Rooms.freeSpots)
	    	.done(function(data) {
	    		self.rooms.reset(JSON.parse(data));
	    		self.latestSync = moment();

	    		Helpers.Environment.log('Rooms synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving rooms");
	    	});
	    };
	    
	    return RoomsController; 
	}
);