define(
	['utils/httpClient',
	 'collections/noteList'],
	function(HttpClient, NoteList) {
	    'use strict';
	    
	    var NotesController = {
	    	latestNotes: null //Observable collection
	    };

	    NotesController.initialize = function() {
	    	
	    };

	    NotesController.getLatestNotesAsync = function() {
	    	HttpClient.postSignedAsync(RemoteConfiguration.Urls.Base + RemoteConfiguration.Urls.Subjects.Notes.latestNotes).done(function(data) {
	    		console.log("Response: " + data);
	    		this.latestNotes = new NoteList(JSON.parse(data));
	    	}).fail(function(error) {
	    		console.log("Error retrieving notes");
	    	});
	    };
	    
	    return NotesController; 
	}
);