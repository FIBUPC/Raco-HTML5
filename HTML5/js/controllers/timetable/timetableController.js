define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/timetable'],
	function(HttpClient, Dispatcher, Timetable) {
	    'use strict';
	    
	    var self,
	    TimetableController = {
	    	timetable: new Timetable(), //Observable collection
	    	latestSync: null
	    };

	    TimetableController.initialize = function() {
	    	self = this;

	    	self.fetchTimetableAsync();
	    };

	    TimetableController.fetchTimetableAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var timetable = localStorage.getItem('TIMETABLE');
		    	if (timetable != null) {
		    		self.latestSync = moment(localStorage.getItem('TIMETABLE_LATEST_SYNC'));
		    		self.timetable = new Timetable(JSON.parse(timetable));
		    	}
		    });
	    };

	    TimetableController.getTimetableAsync = function(force) {
	    	if (self.latestSync != null && !force) {
	    		if (moment().diff(self.latestSync) < Constants.Application.AutoSyncDelay) {
	    			return;
	    		}
	    	}

	    	HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Timetable)
	    	.done(function(data) {
	    		self.timetable.reset(JSON.parse(data));
	    		self.latestSync = moment();

	    		Helpers.Environment.log('Timetable synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving timetable");
	    	});
	    };
	    
	    return TimetableController; 
	}
);