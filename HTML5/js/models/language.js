/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var Language = Backbone.Model.extend({
			defaults: {
				id: null,
				code: null,
				description: null
			},
			idAttribute: "id"
		});

		return Language;
	}
);