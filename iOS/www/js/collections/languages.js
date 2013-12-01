define(
	['models/language'],
	function(Language){
		var Languages = Backbone.Collection.extend({
			model: Language,
			
			initialize: function(models, options) {
				
			}
		});

		return Languages;
	}
);