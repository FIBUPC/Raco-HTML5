define(
	[],
	function(){
		var Note = Backbone.Model.extend({
			defaults: {
				id: null,
				title: null,
				description: null
			}
		});

		return Note;
	}
);