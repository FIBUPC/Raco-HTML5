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

	    /**
		 * Invokes a function within a new thread
		 **/
	    Dispatcher.beginInvoke = function(delegate) {
	    	self.beginInvoke(delegate, 0);
	    };
	    
	    /**
		 * Invokes a function within a new thread with a delay
		 **/
	    Dispatcher.beginInvoke = function(delegate, delay) {
	    	setTimeout(delegate, delay);
	    }
	    
	    return Dispatcher; 
	}
);