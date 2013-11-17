define(
	[],
	function(){
		var CalendarEvent = Backbone.Model.extend({
			defaults: {
				title: null
			}
		});

		return CalendarEvent;
	}
);