define(
	['models/subject'],
	function(Subject){
		var SubjectList = Backbone.Collection.extend({
			model: Subject,
			
			initialize: function(models, options) {
				
			}
		});

		return SubjectList;
	}
);