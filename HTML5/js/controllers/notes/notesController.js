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
		    		self.latestSync = moment(localStorage.getItem('LATEST_NOTES_LATEST_SYNC'));
		    		self.latestNotes = new NoteList(JSON.parse(latestNotes));
		    	}
		    });
	    };

	    NotesController.getLatestNotesAsync = function(force) {
	    	if (!force && self.latestSync != null) {
	    		if (moment().diff(self.latestSync) < Constants.Application.AutoSyncDelay) {
	    			return;
	    		}
	    	}

	    	self.latestSync = moment();
	    	HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base + 
	    		RemoteConfiguration.Urls.LatestNotes).done(function(data) {
	    		// Since notes are coming grouped by subject from the server
	    		// we flatten the array to get just the notes from all of them
	    		var notes = JSON.parse(data);
	    		_.each(notes, function(notes, subjectName) {
	    			_.each(notes, function(note) {
	    				note.subject = subjectName;
	    			});
	    		});
	    		notes = _.flatten(notes);

	    		// Now we sort it by the date they were published, in descending order
	    		notes = _.sortBy(notes, function(note) {
	    			return -moment(note.pubDate); //minus means descending
	    		});

	    		// Now we reset the collection with the flattened notes array
	    		self.latestNotes.reset(notes);
	    		Helpers.Environment.log('Notes synced.');
	    	}).fail(function(error) {
	    		// TODO: throw error to the view
	    		Helpers.Environment.log("Error retrieving notes");
	    	});
	    };

	    NotesController.openAttachment = function(id, subject, name) {
	    	var signedUrl = HttpClient.signUrl(RemoteConfiguration.Urls.Base +
	    		String.format(RemoteConfiguration.Urls.Attachment, subject, id, name));

	    	if (MobileDetector.isNativeApp()) {
	    		window.plugins.childBrowser.showWebPage(signedUrl, function(resp){
	    			
	    		}, function(error) {
	    			
	    		}, true); //opening externally
	    	}
	    	else {
	    		window.open(signedUrl, '_blank');
	    	}
	    };

	    NotesController.markNoteAsRead = function(id) {
	    	// Send request and ignore result as we already set
	    	// this note as read in our own collection
	    	HttpClient.getSignedAsync(RemoteConfiguration.Urls.Base +
	    		String.format(RemoteConfiguration.Urls.MarkNoteAsRead, id), true);
	    };
	    
	    return NotesController; 
	}
);