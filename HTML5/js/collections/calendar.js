/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	['models/calendarEvent'],
	function(CalendarEvent){
		var Calendar = Backbone.Collection.extend({
			model: CalendarEvent,
			
			initialize: function(models, options) {
				
			}
		});

		return Calendar;
	}
);