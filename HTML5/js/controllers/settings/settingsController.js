define(
	['utils/httpClient',
	 'utils/dispatcher',
	 'collections/languages',
	 'models/language',
	 'collections/actions',
	 'models/action'],
	function(HttpClient, Dispatcher, Languages, Language, Actions, Action) {
	    'use strict';
	    
	    var self,
	    SettingsController = {
	    	availableLanguages: new Languages(), //Observable collection
	    	availableActions: new Actions(),
	    	selectedAction: new Action(),
	    	selectedLanguage: new Language()
	    };

	    SettingsController.initialize = function() {
	    	self = this;
	    	
	    	self.loadAvailableLanguages();
	    	self.loadAvailableActions();
	    	self.fetchSettingsAsync();
	    };

	    SettingsController.fetchSettingsAsync = function() {
	    	Dispatcher.beginInvoke(function(){
		    	var selectedAction = localStorage.getItem('SELECTED_ACTION');
		    	if (selectedAction != null) {
		    		self.selectedAction = availableActions.get(selectedAction);
		    	}

		    	var selectedLanguage = localStorage.getItem('SELECTED_LANGUAGE');
		    	if (selectedLanguage != null) {
		    		self.selectedLanguage = availableLanguages.get(selectedLanguage);
		    	}
		    });
	    };

	    SettingsController.loadAvailableLanguages = function() {
	    	//TODO: read from local json
	    };

	    SettingsController.loadAvailableActions = function() {
	    	//TODO: read from local json
	    };
	    
	    return SettingsController; 
	}
);