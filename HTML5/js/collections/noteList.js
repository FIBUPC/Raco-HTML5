define(
	['models/note'],
	function(Note){
		var NoteList = Backbone.Collection.extend({
			model: Note,
			
			initialize: function(models, options) {

			}
		});

		return NoteList;
	}
);