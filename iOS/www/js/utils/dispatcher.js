define(
	[],
	function() {
	    'use strict';
	    
	    var self,
	    Dispatcher = { };

	    Dispatcher.beginInvoke = function(delegate) {
	    	self.beginInvoke(delegate, 0);
	    };

	    Dispatcher.beginInvoke = function(delegate, delay) {
	    	// setTimeout creates a new thread to execute delegate
	    	setTimeout(delegate, delay);
	    }
	    
	    return Dispatcher; 
	}
);