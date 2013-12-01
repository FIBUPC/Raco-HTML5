define(
	['models/new'],
	function(New){
		var NewsList = Backbone.Collection.extend({
			model: New,
			
			initialize: function(models, options) {

			}
		});

		return NewsList;
	}
);