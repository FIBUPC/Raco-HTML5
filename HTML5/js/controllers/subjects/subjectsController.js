define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/subjectList',
	 'collections/noteList'],
	function(HttpClient, Dispatcher, SubjectList, NoteList) {
	    'use strict';
	    
	    var self,
	    SubjectsController = {
	    	subjects: new SubjectList(), //Observable collection
	    	latestSync: null
	    };

	    SubjectsController.initialize = function() {
	    	self = this;

	    	self.fetchSubjectsAsync();
	    };

	    SubjectsController.fetchSubjectsAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var subjects = localStorage.getItem('SUBJECTS');
		    	if (subjects != null) {
		    		self.latestSync = moment(localStorage.getItem('SUBJECTS_LATEST_SYNC'));
		    		self.subjects = new SubjectList(JSON.parse(subjects));
		    	}
		    });
	    };

	    SubjectsController.getSubjectsAsync = function(force) {
	    	if (self.latestSync != null && !force) {
	    		if (moment().diff(self.latestSync) < Constants.Application.AutoSyncDelay) {
	    			return;
	    		}
	    	}

	    	self.latestSync = moment();
	    	HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Subjects.List)
	    	.done(function (data) {
	    		var subjects = JSON.parse(data);
				
	    		// Retrieve information and notes for all subjects in the list
	    		var requests = new Array();
	    		_.each(subjects, function(subject, index) {
	    			var informationRequest = HttpClient.getAsync(RemoteConfiguration.Urls.Base +
	    				String.format(RemoteConfiguration.Urls.Subjects.Details, subject.codi_upc));
	    			var notesRequest = HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base +
	    				String.format(RemoteConfiguration.Urls.Subjects.Notes, subject.idAssig));

	    			requests.push(informationRequest);
	    			requests.push(notesRequest);
	    			$.when(informationRequest, notesRequest).done(function (information, notes) {
	    				subjects[index].info = information;
	    				subjects[index].notes = new NoteList(JSON.parse(notes));
	    			});
	    		});

	    	    $.when.apply(null, requests).done(function () {
	    			self.subjects.reset(subjects);

					Helpers.Environment.log('Subjects synced.');
				}).fail(function(error){
					console.log("Error retrieving subjects information")
				});
	    	}).fail(function(error) {
	    		console.log("Error retrieving subjects");
	    	});
	    };
	    
	    return SubjectsController; 
	}
);