define(
	[],
	function(){
		var Timetable = Backbone.Model.extend({
			defaults: {
				classes: null
			}
		});

		return Timetable;
	}
);