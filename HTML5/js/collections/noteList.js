/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

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