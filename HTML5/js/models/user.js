define(
	[],
	function(){
		var User = Backbone.Model.extend({
			defaults: {
			},
			idAttribute: "id"
		});

		return User;
	}
);