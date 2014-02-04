/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var Note = Backbone.Model.extend({
			defaults: { },
			idAttribute: "id"
		});

		return Note;
	}
);