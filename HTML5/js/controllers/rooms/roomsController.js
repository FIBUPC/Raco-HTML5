define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/roomsList'],
	function(HttpClient, Dispatcher, RoomsList) {
	    'use strict';
	    
	    var self,
	    RoomsController = {
	    	rooms: new RoomsList(), //Observable collection,
	    	maps: {
	    		a5: null,
	    		b5: null,
	    		c6: null
	    	},
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
	    		RemoteConfiguration.Urls.Rooms.FreeSpots);

	    	var timetableRequest = HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Rooms.Scheduling);

	    	var a5mapRequest = HttpClient.readStreamAsync(String.format(RemoteConfiguration.Urls.Rooms.Map, 'a5'));
	    	var b5mapRequest = HttpClient.readStreamAsync(String.format(RemoteConfiguration.Urls.Rooms.Map, 'b5'));
	    	var c6mapRequest = HttpClient.readStreamAsync(String.format(RemoteConfiguration.Urls.Rooms.Map, 'c6'));

	    	// Wait for the two requests to be completed
	    	$.when(freeSpotsRequest, timetableRequest, a5mapRequest, b5mapRequest, c6mapRequest)
	    		.done(function(freeSpots, timetable, a5map, b5map, c6map) {
	    		self.maps.a5 = a5map;
	    		self.maps.b5 = b5map;
	    		self.maps.c6 = c6map;

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