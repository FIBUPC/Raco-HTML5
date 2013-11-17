define(
	[],
	function(){
		var TimetableEvent = Backbone.Model.extend({
			defaults: {
				title: null
			}
		});

		return TimetableEvent;
	}
);