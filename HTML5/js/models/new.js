/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var New = Backbone.Model.extend({
			defaults: {
				id: null,
				title: null,
				description: null
			},
			idAttribute: "id"
		});

		return New;
	}
);