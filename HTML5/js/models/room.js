define(
	[],
	function(){
		var Room = Backbone.Model.extend({
			defaults: {
				nom: null,
				places: 0
			},
			idAttribute: "nom"
		});

		return Room;
	}
);