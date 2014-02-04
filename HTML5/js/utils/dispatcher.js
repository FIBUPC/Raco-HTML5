/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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
	    	// setTimeout creates a new thread to execute the delegate method
	    	setTimeout(delegate, delay);
	    }
	    
	    return Dispatcher; 
	}
);