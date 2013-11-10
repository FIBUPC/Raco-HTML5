define(
	['utils/httpClient',
	 'collections/subjectList'],
	function(HttpClient, SubjectList) {
	    'use strict';
	    
	    var SubjectsController = {
	    	subjects: null //Observable collection
	    };

	    SubjectsController.initialize = function() {
	    	
	    };

	    SubjectsController.getSubjectsAsync = function() {
	    	HttpClient.postSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Subjects.subjects)
	    	.done(function(data) {
	    		this.subjects = new SubjectList(JSON.parse(data));
	    	}).fail(function(error) {
	    		console.log("Error retrieving subjects");
	    	});
	    };
	    
	    return SubjectsController; 
	}
);