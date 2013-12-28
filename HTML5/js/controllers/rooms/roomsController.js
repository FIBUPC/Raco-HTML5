define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/roomsList'],
	function(HttpClient, Dispatcher, RoomsList) {
	    'use strict';
	    
	    var self,
	    RoomsController = {
	    	rooms: new RoomsList(), //Observable collection,
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

	    	var freeSpotsRequest = HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Rooms.freeSpots);

	    	var timetableRequest = HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Rooms.scheduling);

	    	// Wait for the two requests to be completed
	    	$.when(freeSpotsRequest, timetableRequest).done(function(freeSpots, timetable) {
	    		// Parse rooms
	    		var rooms = (JSON.parse(freeSpots)).aules;

	    		// Parse timetable
	    		var parsedTimetable = $.icalendar.parse(timetable);

	    		// Match each room with its timetable
	    		if (!_.isEmpty(rooms) && !_.isEmpty(parsedTimetable)) {
	    			_.each(rooms, function(room, index) {
	    				var currentRoomTimetable = _.filter(parsedTimetable.vevent, function(event){
	    					return event.location.toLowerCase() === room.nom.toLowerCase();
	    				});

	    				rooms[index].timetable = _.sortBy(currentRoomTimetable, function(event){
	    					return event.dtstart;
	    				});
	    			});
	    		}

	    		// Reset our collection with actual updated data
	    		self.rooms.reset(rooms);
	    		self.latestSync = moment();

	    		Helpers.Environment.log('Rooms synced.');
	    	}).fail(function() {
				console.log("Error retrieving rooms");
	    	});
	    };
	    
	    return RoomsController; 
	}
);