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