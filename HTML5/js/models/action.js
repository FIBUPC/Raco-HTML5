/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var Action = Backbone.Model.extend({
			defaults: {
				id: null,
				url: null,
				description: null
			},
			idAttribute: "id"
		});

		return Action;
	}
);