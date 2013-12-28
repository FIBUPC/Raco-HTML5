define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/calendar'],
	function(HttpClient, Dispatcher, Calendar) {
	    'use strict';
	    
	    var self,
	    CalendarController = {
	    	calendar: new Calendar(), //Observable collection
	    	latestSync: null
	    };

	    CalendarController.initialize = function() {
	    	self = this;

	    	self.fetchCalendarAsync();
	    };

	    CalendarController.fetchCalendarAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var calendar = localStorage.getItem('CALENDAR');
		    	if (calendar != null) {
		    		self.latestSync = moment(localStorage.getItem('CALENDAR_LATEST_SYNC'));
		    		self.calendar = new Timetable(JSON.parse(calendar));
		    	}
		    });
	    };

	    CalendarController.getCalendarAsync = function(force) {
	    	if (self.latestSync != null && !force) {
	    		if (moment().diff(self.latestSync) < Constants.Application.AutoSyncDelay) {
	    			return;
	    		}
	    	}

	    	HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Calendar.calendar)
	    	.done(function(data) {
	    		self.calendar.reset(JSON.parse(data));
	    		self.latestSync = moment();

	    		Helpers.Environment.log('Calendar synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving calendar");
	    	});
	    };
	    
	    return CalendarController; 
	}
);