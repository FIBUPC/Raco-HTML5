define(
	[],
	function(){
		var New = Backbone.Model.extend({
			defaults: {
				id: null,
				title: null,
				description: null
			},
			idAttribute: "id"
		});

		return New;
	}
);