/* 
    (c)2014 Barcelona School of Informatics. All rights reserved.

    @author: Cristian Ortega;
    @publisher: inLabFIB;
*/

define(
	[],
	function(){
		var User = Backbone.Model.extend({
			defaults: {
			},
			idAttribute: "id"
		});

		return User;
	}
);