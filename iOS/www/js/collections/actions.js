define(
	['models/action'],
	function(Action){
		var Actions = Backbone.Collection.extend({
			model: Action,
			
			initialize: function(models, options) {
				
			}
		});

		return Actions;
	}
);