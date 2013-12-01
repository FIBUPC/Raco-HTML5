define(
	['models/timetableEvent'],
	function(TimetableEvent){
		var Timetable = Backbone.Collection.extend({
			model: TimetableEvent,
			
			initialize: function(models, options) {
				
			}
		});

		return Timetable;
	}
);