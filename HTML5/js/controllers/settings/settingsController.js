/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['utils/httpClient',
	 'utils/dispatcher'],
	function(HttpClient, Dispatcher) {
	    'use strict';
	    
	    var self,
	    SettingsController = {
	    	selectedAction: null
	    };

	    SettingsController.initialize = function() {
	    	self = this;
	    	
	    	self.fetchSettings();
	    };

	    SettingsController.fetchSettings = function() {
	    	self.selectedAction = localStorage.getItem('SELECTED_ACTION');
	    };
	    
	    SettingsController.saveSelectedActionAsync = function(selectedAction) {
	    	Dispatcher.beginInvoke(function(){
	    		localStorage.setItem('SELECTED_ACTION', selectedAction);
	    	});
	    };
	    
	    return SettingsController; 
	}
);