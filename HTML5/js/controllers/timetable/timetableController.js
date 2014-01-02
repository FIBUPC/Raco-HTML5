define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'models/timetable'],
	function(HttpClient, Dispatcher, Timetable) {
	    'use strict';
	    
	    var self,
	    TimetableController = {
	    	timetable: new Timetable(),
	    	subjects: null,
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

	    	self.latestSync = moment();
	    	HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Timetable)
	    	.done(function(data) {
	    		var parsedTimetable = JSON.parse(data);
	    		var subjects = _.uniq(_.pluck(parsedTimetable, 'Assig'));

	    		var timetable = [];
	    		if (!_.isEmpty(parsedTimetable)) {
		    		var timetable = new Array(6); // from monday to friday
		    		for (var i = 0; i < timetable.length; ++i) {
		    			timetable[i] = new Array(24); // from 00:00 to 23:00

		    			for (var j = 0; j < 24; ++j) {
		    				timetable[i][j] = new Array();
		    			}
		    		}

		    		// Now insert each class in the correct field of the matrix
		    		_.each(parsedTimetable, function(classEvent) {
		    			timetable[classEvent.Dia][classEvent.HoraInici].push({
		    				subject: classEvent.Assig,
		    				group: classEvent.Grup,
		    				type: classEvent.Tipus,
		    				rooms: classEvent.Aules
		    			});
		    		});
	    		}

	    		self.subjects = subjects;
	    		self.timetable.set('classes', timetable);

	    		Helpers.Environment.log('Timetable synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving timetable");
	    	});
	    };
	    
	    return TimetableController; 
	}
);