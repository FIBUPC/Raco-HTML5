define(
	[],
	function(){
		var Note = Backbone.Model.extend({
			defaults: { },
			idAttribute: "id"
		});

		return Note;
	}
);