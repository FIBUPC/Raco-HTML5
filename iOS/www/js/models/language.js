define(
	[],
	function(){
		var Language = Backbone.Model.extend({
			defaults: {
				id: null,
				code: null,
				description: null
			},
			idAttribute: "id"
		});

		return Language;
	}
);