/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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
		    	var classes = localStorage.getItem('TIMETABLE_CLASSES');
		    	var subjects = localStorage.getItem('TIMETABLE_SUBJECTS');
		    	if (classes != null && subjects != null) {
		    		self.latestSync = moment(localStorage.getItem('TIMETABLE_LATEST_SYNC'));
		    		self.subjects = JSON.parse(subjects);
		    		self.timetable.set('classes', JSON.parse(classes));
		    	}
		    });
	    };

	    TimetableController.saveTimetableAsync = function(classes, subjects) {
	    	Dispatcher.beginInvoke(function(){
		    	localStorage.setItem('TIMETABLE_CLASSES', JSON.stringify(classes));
		    	localStorage.setItem('TIMETABLE_SUBJECTS', JSON.stringify(subjects));
		    	localStorage.setItem('TIMETABLE_LATEST_SYNC', new Date());
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

	    		self.saveTimetableAsync(timetable, subjects);

	    		Helpers.Environment.log('Timetable synced.');
	    	}).fail(function(error) {
	    		Helpers.Environment.log("Error retrieving timetable");
	    	});
	    };
	    
	    return TimetableController; 
	}
);