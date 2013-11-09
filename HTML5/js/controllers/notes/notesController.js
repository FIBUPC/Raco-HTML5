define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/noteList'],
	function(HttpClient, Dispatcher, NoteList) {
	    'use strict';
	    
	    var self,
	    NotesController = {
	    	latestNotes: new NoteList(), //Observable collection
	    	latestSync: null
	    };

	    NotesController.initialize = function() {
	    	self = this;

	    	self.fetchLatestNotesAsync();
	    };

	    NotesController.fetchLatestNotesAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var latestNotes = localStorage.getItem('LATEST_NOTES');
		    	if (latestNotes != null) {
		    		self.latestNotes = new NoteList(JSON.parse(latestNotes));
		    		self.latestSync = moment(localStorage.getItem('LATEST_NOTES_LATEST_SYNC'));
		    	}
		    });
	    };

	    NotesController.getLatestNotesAsync = function(force) {
	    	if (self.latestSync != null && !force) {
	    		if (moment().diff(self.latestSync) < Constants.Application.AutoSyncDelay) {
	    			return;
	    		}
	    	}

	    	HttpClient.postSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.Subjects.Notes.latestNotes).done(function(data) {
	    		self.latestNotes.reset(JSON.parse(data));
	    		self.latestSync = moment();
	    		Helpers.Environment.log('Notes synced.');
	    	}).fail(function(error) {
	    		// TODO: throw error to the view
	    		Helpers.Environment.log("Error retrieving notes");
	    	});
	    };
	    
	    return NotesController; 
	}
);