define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/subjectList'],
	function(HttpClient, Dispatcher, SubjectList) {
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

	    	HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Subjects)
	    	.done(function(data) {
	    		self.subjects.reset(JSON.parse(data));
	    		self.latestSync = moment();
	    		Helpers.Environment.log('Subjects synced.');
	    	}).fail(function(error) {
	    		console.log("Error retrieving subjects");
	    	});
	    };
	    
	    return SubjectsController; 
	}
);