define(
	[],
	function(){
		var Action = Backbone.Model.extend({
			defaults: {
				id: null,
				url: null,
				description: null
			},
			idAttribute: "id"
		});

		return Action;
	}
);